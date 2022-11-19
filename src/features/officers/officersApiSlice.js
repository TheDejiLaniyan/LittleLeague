import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const officersAdapter = createEntityAdapter({})

const initialState = officersAdapter.getInitialState()

export const officersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOfficers: builder.query({
            query: () => '/officers',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedOfficers = responseData.map(officer => {
                    officer.id = officer._id
                    return officer
                });
                return officersAdapter.setAll(initialState, loadedOfficers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Officer', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Officer', id }))
                    ]
                } else return [{ type: 'Officer', id: 'LIST' }]
            }
        }),
        addNewOfficer: builder.mutation({
            query: initialOfficerData => ({
                url: '/officers',
                method: 'POST',
                body: {
                    ...initialOfficerData,
                }
            }),
            invalidatesTags: [
                { type: 'Officer', id: "LIST" }
            ]
        }),
        updateOfficer: builder.mutation({
            query: initialOfficerData => ({
                url: '/officers',
                method: 'PATCH',
                body: {
                    ...initialOfficerData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Officer', id: arg.id }
            ]
        }),
        deleteOfficer: builder.mutation({
            query: ({ id }) => ({
                url: `/officers`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Officer', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetOfficersQuery,
    useAddNewOfficerMutation,
    useUpdateOfficerMutation,
    useDeleteOfficerMutation,
} = officersApiSlice

// returns the query result object
export const selectOfficersResult = officersApiSlice.endpoints.getOfficers.select()

// creates memoized selector
const selectOfficersData = createSelector(
    selectOfficersResult,
    officersResult => officersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllOfficers,
    selectById: selectOfficerById,
    selectIds: selectOfficerIds
    // Pass in a selector that returns the officers slice of state
} = officersAdapter.getSelectors(state => selectOfficersData(state) ?? initialState)