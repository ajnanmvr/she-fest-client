"use server";

import { AddCategoryDocument, AddCategoryMutation, AddCategoryMutationVariables, CreateCategoryInput, DeleteCategoryMutation, DeleteCategoryMutationVariables, EditCategoryDocument, EditCategoryMutation, EditCategoryMutationVariables, Exact, MutationRemoveCategoryArgs, UpdateCategoryInput } from "@/gql/graphql";
import { getUrqlClient } from "@/lib/urql";
import { OperationResult } from "urql";

export async function UpdateCategory(data: UpdateCategoryInput ) {
    const name = data.name;
    const section = data.section;
    const id = data.id;
     

    if (name && section && id) {
        const { client } = getUrqlClient();
        const result: OperationResult<
          EditCategoryMutation,
          Exact<UpdateCategoryInput>
        > = await client.mutation<EditCategoryMutation, EditCategoryMutationVariables>(
          EditCategoryDocument,
          {
            id,
            name,
            section,
          },
          {
            fetchOptions: {
              credentials: "include",
            },
          }
        
        );

        // console.log(result);
        
        console.log("Updating........");
        

        }
}

export async function AddCategory(data: CreateCategoryInput) {
    const name = data.name;
    const section = data.section;

    if (name && section) {
        const { client } = getUrqlClient();
        const result: OperationResult<
          AddCategoryMutation,
          Exact<CreateCategoryInput>
        > = await client.mutation<AddCategoryMutation, AddCategoryMutationVariables>(
          AddCategoryDocument,
          {
            name,
            section,
          },
          {
            fetchOptions: {
              credentials: "include",
            },
          }
        );

        console.log(result);
        

        }
}

export async function DeleteCategory(id: number) {
    if (id) {
        const { client } = getUrqlClient();
        const result: OperationResult<
          DeleteCategoryMutation,
          Exact<MutationRemoveCategoryArgs>
        > = await client.mutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(
          EditCategoryDocument,
          {
            id,
          },
          {
            fetchOptions: {
              credentials: "include" as const,
            },
          }
        );

        console.log(result);
        

        }
}