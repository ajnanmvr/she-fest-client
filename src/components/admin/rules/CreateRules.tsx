"use client";
import { AddRulesDocument, AddRulesMutation, AddRulesMutationVariables, CategorySettings } from "@/gql/graphql";
import React from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  category: string;
}

const CreateRules = (props: Props) => {
  const [createRules, setCreateRules] = React.useState<CategorySettings | null>(null);
  const [state, CreateRulesExecute] = useMutation(AddRulesDocument);
  

  const HandleSubmit = async (data: any) => {
    const datas: OperationResult<AddRulesMutation, AddRulesMutationVariables> = await CreateRulesExecute({
      category:  props.category  as string,
      maxGroup: createRules?.maxGroup  || 0 as number,
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
      alert("Rules Added");
    } else {
      console.log(datas.error);
      
      alert("Rules Not Added");
    }
  };

  return (
    <div className="w-full h-screen overflow-scroll"> 
      <h1>Create Rules</h1>

      <form
        onSubmit={
          (e) => {
            e.preventDefault();
            HandleSubmit({ })
          }
        }
      >

<label>Group</label>
        <input
          type="number"
          value={createRules?.maxGroup as number}
          onChange={(e) =>
            setCreateRules({ ...createRules as CategorySettings , maxGroup: +e.target.value })
          }
          placeholder="maxGroup"
        />
        <input
          type="number"
          value={createRules?.minGroup as number}
          onChange={(e) =>
            setCreateRules({ ...createRules  as CategorySettings , minGroup: +e.target.value })
          }
          placeholder="minGroup"
        />

        <label>Single</label>

        <input
          type="number"
          value={createRules?.maxSingle as number}
          onChange={(e) =>
            setCreateRules({ ...createRules  as CategorySettings , maxSingle: +e.target.value })
          }
          placeholder="maxSingle"
        />
        <input
          type="number"
          value={createRules?.minSingle as number}
          onChange={(e) =>
            setCreateRules({ ...createRules  as CategorySettings , minSingle: +e.target.value })
          }
          placeholder="minSingle"
        />

        <label>Stage</label>

        <input
          type="number"
          value={createRules?.maxStage as number}
          onChange={(e) =>
            setCreateRules({ ...createRules  as CategorySettings , maxStage: +e.target.value })
          }
          placeholder="maxStage"
        />
        <input
          type="number"
          value={createRules?.minStage as number}
          onChange={(e) =>
            setCreateRules({ ...createRules  as CategorySettings , minStage: +e.target.value })
          }
          placeholder="minStage"
        />

        <label>Non Stage</label>

        <input
          type="number"
          value={createRules?.maxNonStage as number}
          onChange={(e) =>
            setCreateRules({ ...createRules  as CategorySettings , maxNonStage: +e.target.value })
          }
          placeholder="maxNonStage"
        />

        <input
          type="number"
          value={createRules?.minNonStage as number}
          onChange={(e) =>
            setCreateRules({ ...createRules  as CategorySettings , minNonStage: +e.target.value })
          }
          placeholder="minNonStage"
        />

        <label>OutDoor</label>

        <input
          type="number"
          value={createRules?.maxOutDoor as number}
          onChange={(e) =>
            setCreateRules({ ...createRules  as CategorySettings , maxOutDoor: +e.target.value })
          }
          placeholder="maxOutDoor"
        />

        <input
          type="number"
          value={createRules?.minOutDoor as number}
          onChange={(e) =>
            setCreateRules({ ...createRules  as CategorySettings , minOutDoor: +e.target.value })
          }
          placeholder="minOutDoor"
        />

        <label>Program</label>

        <input
          type="number"
          value={createRules?.maxProgram as number}
          onChange={(e) =>
            setCreateRules({ ...createRules  as CategorySettings , maxProgram: +e.target.value })
          }
          placeholder="maxProgram"
        />

        <input
          type="number"
          value={createRules?.minProgram as number}
          onChange={(e) =>
            setCreateRules({ ...createRules  as CategorySettings , minProgram: +e.target.value })
          }
          placeholder="minProgram"
        />

        <label>Sports</label>

        <input
          type="number"
          value={createRules?.maxSports as number}
          onChange={(e) =>
            setCreateRules({ ...createRules  as CategorySettings , maxSports: +e.target.value })
          }
          placeholder="maxSports"
        />

        <input
          type="number"
          value={createRules?.minSports as number}
          onChange={(e) =>
            setCreateRules({ ...createRules  as CategorySettings , minSports: +e.target.value })
          }
          placeholder="minSports"
        />

        <label>Sports Group</label>

        <input
          type="number"
          value={createRules?.maxSportsGroup as number}
          onChange={(e) =>
            setCreateRules({ ...createRules  as CategorySettings , maxSportsGroup: +e.target.value })
          }
          placeholder="maxSportsGroup"
        />

        <input
          type="number"
          value={createRules?.minSportsGroup as number}
          onChange={(e) =>
            setCreateRules({ ...createRules  as CategorySettings , minSportsGroup: +e.target.value })
          }
          placeholder="minSportsGroup"
        />

        <label>Sports Single</label>

        <input
          type="number"
          value={createRules?.maxSportsSingle as number}
          onChange={(e) =>
            setCreateRules({ ...createRules  as CategorySettings , maxSportsSingle: +e.target.value })
          }
          placeholder="maxSportsSingle"
        />

        <input
          type="number"
          value={createRules?.minSportsSingle as number}
          onChange={(e) =>
            setCreateRules({ ...createRules  as CategorySettings , minSportsSingle: +e.target.value })
          }
          placeholder="minSportsSingle"
        />


       
        <button
          className="bg-fuchsia-600"
          type="submit"
          disabled={state.fetching}
        >
          {state.fetching ? "Loading" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateRules;
