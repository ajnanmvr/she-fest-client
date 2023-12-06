"use client";
import {
  CategorySettings,
  EditRulesDocument,
  EditRulesMutation,
  EditRulesMutationVariables,
} from "@/gql/graphql";
import { ChevronRight } from "@/icons/arrows";
import React from "react";
import { toast } from "react-toastify";
import { OperationResult, useMutation } from "urql";

interface Props {
  id: number;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: CategorySettings;
  category: string;
}

const EditRules = (props: Props) => {
  console.log(props.data);
  const [state, UpdateRulesExecute] = useMutation(EditRulesDocument);
  const [EditRules, setEditRules] = React.useState<CategorySettings>(
    props.data
  );

  console.log(EditRules);
  const HandleSubmit = async (data: any) => {
    console.log(EditRules);

    const updatedData: OperationResult<
      EditRulesMutation,
      EditRulesMutationVariables
    > = await UpdateRulesExecute({
      id: props.data.id as number,
      category: props.category as string,
      maxGroup: EditRules.maxGroup || 0 as number,
      minGroup: EditRules.minGroup || 0 as number,
      maxSingle: EditRules.maxSingle || 0 as number,
      minSingle: EditRules.minSingle || 0 as number,
      maxStage: EditRules.maxStage || 0 as number,
      minStage: EditRules.minStage || 0 as number,
      maxNonStage: EditRules.maxNonStage || 0 as number,
      minNonStage: EditRules.minNonStage || 0 as number,
      maxOutDoor: EditRules.maxOutDoor || 0 as number,
      minOutDoor: EditRules.minOutDoor || 0 as number,
      maxProgram: EditRules.maxProgram || 0 as number,
      minProgram: EditRules.minProgram || 0 as number,
      maxSports: EditRules.maxSports || 0 as number,
      minSports: EditRules.minSports || 0 as number,
      maxSportsGroup: EditRules.maxSportsGroup || 0 as number,
      minSportsGroup: EditRules.minSportsGroup || 0 as number,
      maxSportsSingle: EditRules.maxSportsSingle || 0 as number,
      minSportsSingle: EditRules.minSportsSingle || 0 as number,
    });

    if (updatedData.data?.updateCategorySetting) {
      console.log(updatedData.data?.updateCategorySetting);

      toast.success("Rules Updated");
    } else if (updatedData.error?.message) {
      updatedData.error?.message.split("]")[1].startsWith(" target") ? toast.error("server error") : toast.error(updatedData.error?.message.split("]")[1]);
    }
    props.setIsEdit(false);
  };

  return (
    <div className='w-full h-full  flex flex-col justify-between'>

      <h1>Edit Rules</h1>

      <form
        className='w-full h-full flex  flex-col '

        onSubmit={(e) => {
          e.preventDefault();
          HandleSubmit({});
        }}
      >

        <label>Group</label>
        <div className="flex items-center justify-center gap-3">
          <input
            className='input input-bordered input-secondary w-full max-w-xs'
            type="number"
            value={EditRules.maxGroup as number}
            onChange={(e) =>
              setEditRules({ ...EditRules, maxGroup: +e.target.value })
            }
            placeholder="maxGroup"
          />
          <input
            className='input input-bordered input-secondary w-full max-w-xs'
            type="number"
            value={EditRules.minGroup as number}
            onChange={(e) =>
              setEditRules({ ...EditRules, minGroup: +e.target.value })
            }
            placeholder="minGroup"
          />
        </div>
        <label>Single</label>
        <div className="flex items-center justify-center gap-3">

          <input
            className='input input-bordered input-secondary w-full max-w-xs'
            type="number"
            value={EditRules.maxSingle as number}
            onChange={(e) =>
              setEditRules({ ...EditRules, maxSingle: +e.target.value })
            }
            placeholder="maxSingle"
          />
          <input
            className='input input-bordered input-secondary w-full max-w-xs'
            type="number"
            value={EditRules.minSingle as number}
            onChange={(e) =>
              setEditRules({ ...EditRules, minSingle: +e.target.value })
            }
            placeholder="minSingle"
          />
        </div>
        <label>Stage</label>
        <div className="flex items-center justify-center gap-3">

          <input
            type="number"
            className='input input-bordered input-secondary w-full max-w-xs'
            value={EditRules.maxStage as number}
            onChange={(e) =>
              setEditRules({ ...EditRules, maxStage: +e.target.value })
            }
            placeholder="maxStage"
          />
          <input
            className='input input-bordered input-secondary w-full max-w-xs'
            type="number"
            value={EditRules.minStage as number}
            onChange={(e) =>
              setEditRules({ ...EditRules, minStage: +e.target.value })
            }
            placeholder="minStage"
          />
        </div>
        <label>Non Stage</label>
        <div className="flex items-center justify-center gap-3">

          <input
            className='input input-bordered input-secondary w-full max-w-xs'
            type="number"
            value={EditRules.maxNonStage as number}
            onChange={(e) =>
              setEditRules({ ...EditRules, maxNonStage: +e.target.value })
            }
            placeholder="maxNonStage"
          />

          <input
            className='input input-bordered input-secondary w-full max-w-xs'
            type="number"
            value={EditRules.minNonStage as number}
            onChange={(e) =>
              setEditRules({ ...EditRules, minNonStage: +e.target.value })
            }
            placeholder="minNonStage"
          />
        </div>

        <label>OutDoor</label>
        <div className="flex items-center justify-center gap-3">

          <input
            className='input input-bordered input-secondary w-full max-w-xs'
            type="number"
            value={EditRules.maxOutDoor as number}
            onChange={(e) =>
              setEditRules({ ...EditRules, maxOutDoor: +e.target.value })
            }
            placeholder="maxOutDoor"
          />

          <input
            className='input input-bordered input-secondary w-full max-w-xs'
            type="number"
            value={EditRules.minOutDoor as number}
            onChange={(e) =>
              setEditRules({ ...EditRules, minOutDoor: +e.target.value })
            }
            placeholder="minOutDoor"
          />
        </div>
        <label>Program</label>
        <div className="flex items-center justify-center gap-3">

          <input
            className='input input-bordered input-secondary w-full max-w-xs'
            type="number"
            value={EditRules.maxProgram as number}
            onChange={(e) =>
              setEditRules({ ...EditRules, maxProgram: +e.target.value })
            }
            placeholder="maxProgram"
          />

          <input
            className='input input-bordered input-secondary w-full max-w-xs'
            type="number"
            value={EditRules.minProgram as number}
            onChange={(e) =>
              setEditRules({ ...EditRules, minProgram: +e.target.value })
            }
            placeholder="minProgram"
          />
        </div>
        <label>Sports</label>
        <div className="flex items-center justify-center gap-3">

          <input
            className='input input-bordered input-secondary w-full max-w-xs'
            type="number"
            value={EditRules.maxSports as number}
            onChange={(e) =>
              setEditRules({ ...EditRules, maxSports: +e.target.value })
            }
            placeholder="maxSports"
          />

          <input
            className='input input-bordered input-secondary w-full max-w-xs'
            type="number"
            value={EditRules.minSports as number}
            onChange={(e) =>
              setEditRules({ ...EditRules, minSports: +e.target.value })
            }
            placeholder="minSports"
          />
        </div>
        <label>Sports Group</label>
        <div className="flex items-center justify-center gap-3">

          <input
            className='input input-bordered input-secondary w-full max-w-xs'
            type="number"
            value={EditRules.maxSportsGroup as number}
            onChange={(e) =>
              setEditRules({ ...EditRules, maxSportsGroup: +e.target.value })
            }
            placeholder="maxSportsGroup"
          />

          <input
            className='input input-bordered input-secondary w-full max-w-xs'
            type="number"
            value={EditRules.minSportsGroup as number}
            onChange={(e) =>
              setEditRules({ ...EditRules, minSportsGroup: +e.target.value })
            }
            placeholder="minSportsGroup"
          />
        </div>
        <label>Sports Single</label>
        <div className="flex items-center justify-center gap-3">

          <input
            className='input input-bordered input-secondary w-full max-w-xs'
            type="number"
            value={EditRules.maxSportsSingle as number}
            onChange={(e) =>
              setEditRules({ ...EditRules, maxSportsSingle: +e.target.value })
            }
            placeholder="maxSportsSingle"
          />

          <input
            className='input input-bordered input-secondary w-full max-w-xs'
            type="number"
            value={EditRules.minSportsSingle as number}
            onChange={(e) =>
              setEditRules({ ...EditRules, minSportsSingle: +e.target.value })
            }
            placeholder="minSportsSingle"
          />
        </div>




        <div className="w-full  mt-4 flex items-center justify-between">
          <button
            type="submit"
            className="bg-secondary w-1/2 border-2 text-white px-3 flex-1 py-2 border-secondary rounded-xl font-bold"
          >
            {/* {isLoading ? "Loading..." : "Submit"}
             */}
            submit
          </button>

          <div
            className="w-1/2 flex items-center justify-center tooltip"
            data-tip="Back"
          >
            <ChevronRight
              className="w-7 h-7 cursor-pointer fill-secondary  transition-all  "
              SetOpen={props.setIsEdit}
              open={props.isEdit}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditRules;
