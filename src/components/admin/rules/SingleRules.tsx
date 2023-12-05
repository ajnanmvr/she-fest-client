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

interface Props {
  id: number;
  name: string;
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: Category[];
  setData: React.Dispatch<React.SetStateAction<Category[]>>;
  isOpen : boolean;
  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>;
}

const OneRules = (props: Props) => {

  const [{ fetching, data }] = useQuery<
    GetRulesQuery,
    GetRulesQueryVariables
  >({
    query: GetRulesDocument,
    variables: {
      id: props.id,
    },
    pause: props.isEdit && !props.isCreate,
  });

  const rules : CategorySettings  = data?.category.settings as CategorySettings
  const category : Category = data?.category as Category

  return (
    <div>
      {props.isEdit ? (
        <EditRules
          key={1}
          setIsEdit={props.setIsEdit}
          data={rules as CategorySettings}
          id={props.id}
          isEdit={props.isEdit}
          category={  category.name as string}
        />
      ) : props.isCreate ? (
        <CreateRules key={2} category={category.name as string} />
      ) : (
        <div>
          {fetching ? (
            <p> loading... </p> 
          ) : rules ? (
            <div>
              
              <p>Group</p>
              <p>
                Max: {rules.maxGroup || 0} Min: {rules.minGroup || 0}
              </p>
              <p>Single</p>
              <p>
                Max: {rules.maxSingle || 0} Min: {rules.minSingle || 0}
              </p>
              <p>Stage</p>
              <p>
                Max: {rules.maxStage || 0} Min: {rules.minStage|| 0}
              </p>
              <p>Non Stage</p>
              <p>
                Max: {rules.maxNonStage|| 0} Min: {rules.minNonStage|| 0}
              </p>
              <p>Out Door</p>
              <p>
                Max: {rules.maxOutDoor|| 0} Min: {rules.minOutDoor|| 0}
              </p>
              <p>Program</p>
              <p>
                Max: {rules.maxProgram|| 0} Min: {rules.minProgram|| 0}
              </p>
              <p>Sports</p>
              <p>
                Max: {rules.maxSports|| 0} Min: {rules.minSports|| 0}
              </p>
              <p>Sports Group</p>
              <p>
                Max: {rules.maxSportsGroup|| 0} Min: {rules.minSportsGroup|| 0}
              </p>
              <p>Sports Single</p>
              <p>
                Max: {rules.maxSportsSingle|| 0} Min: {rules.minSportsSingle|| 0}
              </p>
              <p> Updatable : </p>
              <p> {rules.isProgrammeListUpdatable ? "true" : "false"} </p>


              <button
                className="bg-blue-500"
                onClick={() => {
                  props.setIsEdit(true);
                  props.setIsCreate(false);
                }}
              >
                Edit
              </button>
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
