"use client";
import {
  CategorySettings,
  EditRulesDocument,
  EditRulesMutation,
  EditRulesMutationVariables,
} from "@/gql/graphql";
import React from "react";
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
      category:  props.category  as string,
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
      
      alert("Rules Updated");
    } else if (updatedData.error?.message) {
      alert(updatedData.error?.message.split("]")[1]);
    }
    props.setIsEdit(false);
  };

  return (
    <div className="w-full h-screen overflow-scroll">
      <button className="bg-green-500" onClick={() => props.setIsEdit(false)}>
        Back
      </button>
      <h1>Edit Rules</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          HandleSubmit({});
        }}
      >

        <label>Group</label>
        <input
          type="number"
          value={EditRules.maxGroup as number}
          onChange={(e) =>
            setEditRules({ ...EditRules, maxGroup: +e.target.value })
          }
          placeholder="maxGroup"
        />
        <input
          type="number"
          value={EditRules.minGroup as number}
          onChange={(e) =>
            setEditRules({ ...EditRules, minGroup: +e.target.value })
          }
          placeholder="minGroup"
        />

        <label>Single</label>

        <input
          type="number"
          value={EditRules.maxSingle as number}
          onChange={(e) =>
            setEditRules({ ...EditRules, maxSingle: +e.target.value })
          }
          placeholder="maxSingle"
        />
        <input
          type="number"
          value={EditRules.minSingle as number}
          onChange={(e) =>
            setEditRules({ ...EditRules, minSingle: +e.target.value })
          }
          placeholder="minSingle"
        />

        <label>Stage</label>

        <input
          type="number"
          value={EditRules.maxStage as number}
          onChange={(e) =>
            setEditRules({ ...EditRules, maxStage: +e.target.value })
          }
          placeholder="maxStage"
        />
        <input
          type="number"
          value={EditRules.minStage as number}
          onChange={(e) =>
            setEditRules({ ...EditRules, minStage: +e.target.value })
          }
          placeholder="minStage"
        />

        <label>Non Stage</label>

        <input
          type="number"
          value={EditRules.maxNonStage as number}
          onChange={(e) =>
            setEditRules({ ...EditRules, maxNonStage: +e.target.value })
          }
          placeholder="maxNonStage"
        />

        <input
          type="number"
          value={EditRules.minNonStage as number}
          onChange={(e) =>
            setEditRules({ ...EditRules, minNonStage: +e.target.value })
          }
          placeholder="minNonStage"
        />

        <label>OutDoor</label>

        <input
          type="number"
          value={EditRules.maxOutDoor as number}
          onChange={(e) =>
            setEditRules({ ...EditRules, maxOutDoor: +e.target.value })
          }
          placeholder="maxOutDoor"
        />

        <input
          type="number"
          value={EditRules.minOutDoor as number}
          onChange={(e) =>
            setEditRules({ ...EditRules, minOutDoor: +e.target.value })
          }
          placeholder="minOutDoor"
        />

        <label>Program</label>

        <input
          type="number"
          value={EditRules.maxProgram as number}
          onChange={(e) =>
            setEditRules({ ...EditRules, maxProgram: +e.target.value })
          }
          placeholder="maxProgram"
        />

        <input
          type="number"
          value={EditRules.minProgram as number}
          onChange={(e) =>
            setEditRules({ ...EditRules, minProgram: +e.target.value })
          }
          placeholder="minProgram"
        />

        <label>Sports</label>

        <input
          type="number"
          value={EditRules.maxSports as number}
          onChange={(e) =>
            setEditRules({ ...EditRules, maxSports: +e.target.value })
          }
          placeholder="maxSports"
        />

        <input
          type="number"
          value={EditRules.minSports as number}
          onChange={(e) =>
            setEditRules({ ...EditRules, minSports: +e.target.value })
          }
          placeholder="minSports"
        />

        <label>Sports Group</label>

        <input
          type="number"
          value={EditRules.maxSportsGroup as number}
          onChange={(e) =>
            setEditRules({ ...EditRules, maxSportsGroup: +e.target.value })
          }
          placeholder="maxSportsGroup"
        />

        <input
          type="number"
          value={EditRules.minSportsGroup as number}
          onChange={(e) =>
            setEditRules({ ...EditRules, minSportsGroup: +e.target.value })
          }
          placeholder="minSportsGroup"
        />

        <label>Sports Single</label>

        <input
          type="number"
          value={EditRules.maxSportsSingle as number}
          onChange={(e) =>
            setEditRules({ ...EditRules, maxSportsSingle: +e.target.value })
          }
          placeholder="maxSportsSingle"
        />

        <input
          type="number"
          value={EditRules.minSportsSingle as number}
          onChange={(e) =>
            setEditRules({ ...EditRules, minSportsSingle: +e.target.value })
          }
          placeholder="minSportsSingle"
        />





        <button className="bg-fuchsia-600" type="submit">
          {state.fetching ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EditRules;
