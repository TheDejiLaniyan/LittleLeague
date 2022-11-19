import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const leaguesAdapter = createEntityAdapter({})

const initialState = leaguesAdapter.getInitialState()

export const leaguesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLeagues: builder.query({
            query: () => '/leagues',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedLeagues = responseData.map(league => {
                    league.id = league._id
                    return league
                });
                return leaguesAdapter.setAll(initialState, loadedLeagues)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'League', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'League', id }))
                    ]
                } else return [{ type: 'League', id: 'LIST' }]
            }
        }),
        addNewLeague: builder.mutation({
            query: initialLeagueData => ({
                url: '/leagues',
                method: 'POST',
                body: {
                    ...initialLeagueData,
                }
            }),
            invalidatesTags: [
                { type: 'League', id: "LIST" }
            ]
        }),
        updateLeague: builder.mutation({
            query: initialLeagueData => ({
                url: '/leagues',
                method: 'PATCH',
                body: {
                    ...initialLeagueData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'League', id: arg.id }
            ]
        }),
        deleteLeague: builder.mutation({
            query: ({ id }) => ({
                url: `/leagues`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'League', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetLeaguesQuery,
    useAddNewLeagueMutation,
    useUpdateLeagueMutation,
    useDeleteLeagueMutation,
} = leaguesApiSlice

// returns the query result object
export const selectLeaguesResult = leaguesApiSlice.endpoints.getLeagues.select()

// creates memoized selector
const selectLeaguesData = createSelector(
    selectLeaguesResult,
    leaguesResult => leaguesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllLeagues,
    selectById: selectLeagueById,
    selectIds: selectLeagueIds
    // Pass in a selector that returns the leagues slice of state
} = leaguesAdapter.getSelectors(state => selectLeaguesData(state) ?? initialState)