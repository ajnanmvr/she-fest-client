"use client";
import { AddRulesDocument, AddRulesMutation, AddRulesMutationVariables, CategorySettings } from "@/gql/graphql";
import React from "react";
import { toast } from "react-toastify";
import { OperationResult, useMutation } from "urql";

interface Props {
  category: string;
}

const CreateRules = (props: Props) => {
  const [createRules, setCreateRules] = React.useState<CategorySettings | null>(null);
  const [state, CreateRulesExecute] = useMutation(AddRulesDocument);
 


  const HandleSubmit = async (data: any) => {
    const datas: OperationResult<AddRulesMutation, AddRulesMutationVariables> = await CreateRulesExecute({
      category: props.category as string,
      maxGroup: createRules?.maxGroup || 0 as number,
      minGroup: createRules?.minGroup || 0 as number,
      maxSingle: createRules?.maxSingle || 0 as number,
      minSingle: createRules?.minSingle || 0 as number,
      maxStage: createRules?.maxStage || 0 as number,
      minStage: createRules?.minStage || 0 as number,
      maxNonStage: createRules?.maxNonStage || 0 as number,
      minNonStage: createRules?.minNonStage || 0 as number,
      maxOutDoor: createRules?.maxOutDoor || 0 as number,
      minOutDoor: createRules?.minOutDoor || 0 as number,
      maxProgram: createRules?.maxProgram || 0 as number,
      minProgram: createRules?.minProgram || 0 as number,
      maxSports: createRules?.maxSports || 0 as number,
      minSports: createRules?.minSports || 0 as number,
      maxSportsGroup: createRules?.maxSportsGroup || 0 as number,
      minSportsGroup: createRules?.minSportsGroup || 0 as number,
      maxSportsSingle: createRules?.maxSportsSingle || 0 as number,
      minSportsSingle: createRules?.minSportsSingle || 0 as number,
    });

    console.log(datas);


    if (datas.data?.createCategorySetting) {
      toast.success("Rules Added");
    } else {
      console.log(datas.error);

      datas.error?.message.split("]")[1].startsWith(" target") ? toast.error("server error") : toast.error(datas.error?.message.split("]")[1]);
    }
  };

  return (
    <div className="w-full h-screen ">
      <h1>Create Rules</h1>

      <form
        className="h-full w-full flex flex-col items-center justify-between "
        onSubmit={
          (e) => {
            e.preventDefault();
            HandleSubmit({})
          }
        }
      >
        <div className="mt-4">
          <label>Group</label>
          <div className="flex items-center justify-center gap-2">

            <input
             
              className="input input-bordered input-secondary w-full max-w-xs mt-1"
              type="number"
              min={1}
              max={100}
              value={createRules?.maxGroup as number}
              onChange={(e) =>
                setCreateRules({ ...createRules as CategorySettings, maxGroup: +e.target.value })
              }
              placeholder="max"
            />


            <input
              className="input input-bordered input-secondary w-full max-w-xs mt-1"
              type="number"
              value={createRules?.minGroup as number}
              onChange={(e) =>
                setCreateRules({ ...createRules as CategorySettings, minGroup: +e.target.value })
              }
              placeholder="min"
            />
          </div>




          <label>Single</label>
          <div className="flex items-center justify-center gap-2">
            <input
              className="input input-bordered input-secondary w-full max-w-xs mt-1"
              type="number"
              value={createRules?.maxSingle as number}
              onChange={(e) =>
                setCreateRules({ ...createRules as CategorySettings, maxSingle: +e.target.value })
              }
              placeholder="max"
            />
            <input
              className="input input-bordered input-secondary w-full max-w-xs mt-1"
              type="number"
              value={createRules?.minSingle as number}
              onChange={(e) =>
                setCreateRules({ ...createRules as CategorySettings, minSingle: +e.target.value })
              }
              placeholder="min"
            />
          </div>
          <label>Stage</label>
          <div className="flex items-center justify-center gap-2">

            <input
              className="input input-bordered input-secondary w-full max-w-xs mt-1"
              type="number"
              value={createRules?.maxStage as number}
              onChange={(e) =>
                setCreateRules({ ...createRules as CategorySettings, maxStage: +e.target.value })
              }
              placeholder="max"
            />
            <input
              className="input input-bordered input-secondary w-full max-w-xs mt-1"
              type="number"
              value={createRules?.minStage as number}
              onChange={(e) =>
                setCreateRules({ ...createRules as CategorySettings, minStage: +e.target.value })
              }
              placeholder="min"
            />
          </div>
          <label>Non Stage</label>
          <div className="flex items-center justify-center gap-2">




            <input
              className="input input-bordered input-secondary w-full max-w-xs mt-1"
              type="number"
              value={createRules?.maxNonStage as number}
              onChange={(e) =>
                setCreateRules({ ...createRules as CategorySettings, maxNonStage: +e.target.value })
              }
              placeholder="max"
            />

            <input
              className="input input-bordered input-secondary w-full max-w-xs mt-1"
              type="number"
              value={createRules?.minNonStage as number}
              onChange={(e) =>
                setCreateRules({ ...createRules as CategorySettings, minNonStage: +e.target.value })
              }
              placeholder="min"
            />
          </div>

          <label>OutDoor</label>
          <div className="flex items-center justify-center gap-2">

            <input
              className="input input-bordered input-secondary w-full max-w-xs mt-1"
              type="number"
              value={createRules?.maxOutDoor as number}
              onChange={(e) =>
                setCreateRules({ ...createRules as CategorySettings, maxOutDoor: +e.target.value })
              }
              placeholder="max"
            />

            <input
              className="input input-bordered input-secondary w-full max-w-xs mt-1"
              type="number"
              value={createRules?.minOutDoor as number}
              onChange={(e) =>
                setCreateRules({ ...createRules as CategorySettings, minOutDoor: +e.target.value })
              }
              placeholder="min"
            />
          </div>

          <label>Program</label>
          <div className="flex items-center justify-center gap-2">

            <input
              className="input input-bordered input-secondary w-full max-w-xs mt-1"
              type="number"
              value={createRules?.maxProgram as number}
              onChange={(e) =>
                setCreateRules({ ...createRules as CategorySettings, maxProgram: +e.target.value })
              }
              placeholder="max"
            />

            <input
              className="input input-bordered input-secondary w-full max-w-xs mt-1"
              type="number"
              value={createRules?.minProgram as number}
              onChange={(e) =>
                setCreateRules({ ...createRules as CategorySettings, minProgram: +e.target.value })
              }
              placeholder="min"
            />
          </div>
            <label>Sports</label>
          <div className="flex items-center justify-center gap-2">

            <input
              className="input input-bordered input-secondary w-full max-w-xs mt-1"
              type="number"
              value={createRules?.maxSports as number}
              onChange={(e) =>
                setCreateRules({ ...createRules as CategorySettings, maxSports: +e.target.value })
              }
              placeholder="max"
            />

            <input
              className="input input-bordered input-secondary w-full max-w-xs mt-1"
              type="number"
              value={createRules?.minSports as number}
              onChange={(e) =>
                setCreateRules({ ...createRules as CategorySettings, minSports: +e.target.value })
              }
              placeholder="min"
            />
          </div>

          <label>Sports Group</label>
          <div className="flex items-center justify-center gap-2">

            <input
              className="input input-bordered input-secondary w-full max-w-xs mt-1"
              type="number"
              value={createRules?.maxSportsGroup as number}
              onChange={(e) =>
                setCreateRules({ ...createRules as CategorySettings, maxSportsGroup: +e.target.value })
              }
              placeholder="max"
            />

            <input
              className="input input-bordered input-secondary w-full max-w-xs mt-1"
              type="number"
              value={createRules?.minSportsGroup as number}
              onChange={(e) =>
                setCreateRules({ ...createRules as CategorySettings, minSportsGroup: +e.target.value })
              }
              placeholder="min"
            />
          </div>
          <label>Sports Single</label>
          
          <div className="flex items-center justify-center gap-2">

          <input
            className="input input-bordered input-secondary w-full max-w-xs mt-1"
            type="number"
            value={createRules?.maxSportsSingle as number}
            onChange={(e) =>
              setCreateRules({ ...createRules as CategorySettings, maxSportsSingle: +e.target.value })
            }
            placeholder="max"
          />

          <input
            className="input input-bordered input-secondary w-full max-w-xs mt-1"
            type="number"
            value={createRules?.minSportsSingle as number}
            onChange={(e) =>
              setCreateRules({ ...createRules as CategorySettings, minSportsSingle: +e.target.value })
            }
            placeholder="min"
          />
          </div>

        </div>

        <div className="w-full mt-4 flex items-center justify-between">
          <button
            type="submit"
            className="bg-secondary w-1/2 border-2 text-white px-3 flex-1 py-2 border-secondary rounded-xl font-bold"
          >
            {state.fetching ? "Loading..." : "Submit"}
          </button>

          <div
            className="w-1/2 flex items-center justify-center tooltip"
            data-tip="Back"
          ></div>
        </div>
      </form>
    </div>
  );
};

export default CreateRules;
