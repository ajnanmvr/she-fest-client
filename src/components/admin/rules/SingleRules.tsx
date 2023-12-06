"use client";
import {
  GetRulesDocument,
  GetRulesQuery,
  GetRulesQueryVariables,
  Category,
  CategorySettings,
} from "@/gql/graphql";
import EditRules from "./EditRules";
import CreateRules from "./CreateRules";
import { useQuery } from "urql";
import { API_KEY } from "@/lib/env";
import { DeleteIcon, EditIcon } from "@/icons/action";
import { useState } from "react";

interface Props {
  id: number;
  name: string;
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: Category[];
  setData: React.Dispatch<React.SetStateAction<Category[]>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OneRules = (props: Props) => {

  const [{ fetching, data }] = useQuery<
    GetRulesQuery,
    GetRulesQueryVariables
  >({
    query: GetRulesDocument,
    variables: {
      id: props.id,
      api_key: API_KEY
    },
    pause: props.isEdit && !props.isCreate,
  });

  const rules: CategorySettings = data?.category.settings as CategorySettings
  const category: Category = data?.category as Category

  return (
    <div className="w-full h-screen ">
      {props.isEdit ? (
        <EditRules
          key={1}
          setIsEdit={props.setIsEdit}
          data={rules as CategorySettings}
          id={props.id}
          isEdit={props.isEdit}
          category={category.name as string}
        />
        ) : props.isCreate ? (
          <CreateRules key={2} category={category?.name as string} />
        ) : (
        <div className="h-full w-full flex flex-col  ">
          {fetching ? (
            <p> loading... </p>
          ) : rules ? (
            <div className="mt-4">
              <div>
                <p>Group</p>

                <div className="  border-none flex items-center justify-evenly input input-bordered input-secondary w-full max-w-xs mt-1 ">
                  <span> Max: {rules.maxGroup || 0}</span> <span>Min: {rules.minGroup || 0}</span>
                </div>
                <p>Single</p>
                <div className="  border-none flex items-center justify-evenly input input-bordered input-secondary w-full max-w-xs mt-1">
                  <span>Max: {rules.maxSingle || 0}</span>  <span>Min: {rules.minSingle || 0}</span>
                </div>
                <p>Stage</p>
                <div className="  border-none flex items-center justify-evenly input input-bordered input-secondary w-full max-w-xs mt-1">
                  <span>Max: {rules.maxStage || 0}</span> <span>Min: {rules.minStage || 0}</span>
                </div>
                <p>Non Stage</p>
                <div className="  border-none flex items-center justify-evenly input input-bordered input-secondary w-full max-w-xs mt-1">
                  <span>Max: {rules.maxNonStage || 0}</span> <span>Min: {rules.minNonStage || 0}</span>

                </div>
                <p >Out Door</p>
                <div className="  border-none flex items-center justify-evenly input input-bordered input-secondary w-full max-w-xs mt-1">
                  <span>Max: {rules.maxOutDoor || 0}</span> <span>Min: {rules.minOutDoor || 0}</span>

                </div>
                <p>Program</p>
                <div className="  border-none flex items-center justify-evenly input input-bordered input-secondary w-full max-w-xs mt-1">
                  <span>Max: {rules.maxProgram || 0}</span> <span>Min: {rules.minProgram || 0}</span>

                </div>
                <p>Sports</p>
                <div className="  border-none flex items-center justify-evenly input input-bordered input-secondary w-full max-w-xs mt-1">
                  <span> Max: {rules.maxSports || 0} </span>  <span>Min: {rules.minSports || 0}</span>

                </div>
                <p>Sports Group</p>
                <div className="  border-none flex items-center justify-evenly input input-bordered input-secondary w-full max-w-xs mt-1">
                  <span>Max: {rules.maxSportsGroup || 0}</span> <span>Min: {rules.minSportsGroup || 0}</span>

                </div>
                <p>Sports Single</p>
                <div className="  border-none flex items-center justify-evenly input input-bordered input-secondary w-full max-w-xs mt-1">
                  <span>Max: {rules.maxSportsSingle || 0}</span> <span>Min: {rules.minSportsSingle || 0}</span>

                </div>
                <p> Updatable : </p>
                <div className="  border-none flex items-center justify-center input input-bordered input-secondary w-full max-w-xs mt-1"> {rules.isProgrammeListUpdatable ? "true" : "false"} </div>
              </div>
              <div className="w-full mt-4 flex items-center justify-between">
                <div
                  className="w-1/2 flex items-center justify-center tooltip"
                  data-tip="Back"
                ></div>
                <div className="w-1/2 flex items-center justify-around">
                  <button
                    className=" border-2 text-white px-3 py-2 border-secondary rounded-xl font-bold"
                    onClick={() => {
                      props.setIsEdit(true);
                      props.setIsCreate(false);
                    }}
                  >
                    <EditIcon className="w-6 h-6 cursor-pointer fill-secondary  transition-all" />
                  </button>
                  
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>This category not have rules yet!</p>
              <button
                className="bg-blue-500"
                onClick={() => {
                  props.setIsEdit(false);
                  props.setIsCreate(true);
                }}
              >
                Create
              </button>

            </div>
          )
          }
        </div>
      )}
    </div>
  );
};

export default OneRules;
