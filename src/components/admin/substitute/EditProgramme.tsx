import Alert from '@/components/Alert';
import { Category, EditProgrammeDocument, EditProgrammeMutation, EditProgrammeMutationVariables, Mode, Model, Programme, Skill, Type } from '@/gql/graphql';
import { ChevronRight } from '@/icons/arrows';
import React from 'react'
import { toast } from 'react-toastify';
import { OperationResult, useMutation } from 'urql';

interface Props {
  name: string;
  id: number;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: Programme[];
  setData: React.Dispatch<React.SetStateAction<Programme[]>>
  selectedProgramme: Programme;
  skill: string;
  category: string;
  programeCode: string;
  candiateCount: number;
  groupCount: number;
  duration: number;
  conceptNote: string;
  mode: Mode;
  model: Model;
  type: string;
  categories: Category[];
  skills: Skill[];
}

const EditProgramme = (props: Props) => {
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>(props.name);
  const [category, setCategory] = React.useState<string>(props.category);
  const [skill, setSkill] = React.useState<string>(props.skill);
  const [mode, setMode] = React.useState<Mode>(props.mode);
  const [model, setModel] = React.useState<Model>(props.model);
  const [programCode, setProgramCode] = React.useState<string>(props.programeCode);
  const [candidateCount, setCandidateCount] = React.useState<number>(props.candiateCount);
  const [groupCount, setGroupCount] = React.useState<number>(props.groupCount);
  const [duration, setDuration] = React.useState<number>(props.duration);
  const [conceptNote, setConceptNote] = React.useState<string>(props.conceptNote);
  const [type, setType] = React.useState<string>(props.type);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [state, UpdateProgrammeExecute] = useMutation(EditProgrammeDocument);


  const HandleSubmit = async (data: any) => {
    console.log(data);

    setIsLoading(true);
    const updatedData: OperationResult<EditProgrammeMutation, EditProgrammeMutationVariables> = await UpdateProgrammeExecute({
      id: props.id,
      name: data.name,
      candidateCount: data.candidateCount,
      category: data.category,
      conceptNote: data.conceptNote,
      duration: data.duration,
      groupCount: data.groupCount,
      mode: data.mode,
      model: data.model,
      programCode: data.programCode,
      skill: data.skill,
      type: data.type
    });

    console.log(updatedData);

    if (updatedData.data?.updateProgramme) {
      
      toast.success("Programme Updated Successfully");
      const updatedDates = props.data.map((value, index) => {
        if (value.id == updatedData.data?.updateProgramme?.id) {
          return value = updatedData.data?.updateProgramme as Programme
        } else {
          return value
        }
      })
      console.log(updatedDates);

      props.setData(updatedDates as Programme[]);
    } else if (updatedData.error?.message) {
      updatedData.error?.message.split("]")[1].startsWith(" target") ? toast.error("server error") : toast.error(updatedData.error?.message.split("]")[1]);
    }
    else {
      toast.error("Programme Not Updated");
    }
    setIsLoading(false);
    props.setIsEdit(false);
  }


  return (
   
    <div className='w-full h-full flex justify-between'>


      <form
        className='w-full h-full flex justify-between flex-col'
        onSubmit={(e) => {
          e.preventDefault();
          HandleSubmit({ name, candidateCount, category, conceptNote, duration, groupCount, mode, model, programCode, skill, type })
        }}
      >
        <div>

          <input
            className='input input-bordered input-secondary w-full max-w-xs'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <p>candidateCount</p>
          <input type="number"
            className='input input-bordered input-secondary w-full max-w-xs'
            value={candidateCount}
            onChange={(e) => setCandidateCount(parseInt(e.target.value))}
            placeholder="candidateCount" />
          <p>category</p>

          <select name="" id=""
            className="select select-secondary w-full max-w-xs h-8"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {props.categories.map((value, index) => {
              return <option value={value.name as string}>{value.name}</option>
            }
            )}
          </select>

          <p>conceptNote</p>

          <textarea 
            className='input input-bordered input-secondary w-full max-w-xs min-h-[8rem]'
            value={conceptNote}
            onChange={(e) => setConceptNote(e.target.value)}
            placeholder="conceptNote" />
          <p>duration</p>
          <input type="number"
            className='input input-bordered input-secondary w-full max-w-xs'
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            placeholder="duration" />
          <p>groupCount</p>
          <input type="number"
            className='input input-bordered input-secondary w-full max-w-xs'
            value={groupCount}
            onChange={(e) => setGroupCount(parseInt(e.target.value))}
            placeholder="groupCount" />
          <p>mode</p>

          <select name="" id=""
            className="select select-secondary w-full max-w-xs h-8"
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
          >
            <option value={Mode.NonStage}>Non Stage</option>
            <option value={Mode.Stage}>Stage</option>
            <option value={Mode.OutdoorStage}>Outdoor Stage</option>
          </select>
          <p>Model</p>
          <select name="" id=""
            className="select select-secondary w-full max-w-xs h-8"
            value={model}
            onChange={(e) => setModel(e.target.value as Model)}
          >
            <option value={Model.Arts}>Arts</option>
            <option value={Model.Sports}>Sports</option>
          </select>
          <p>Program code</p>
          <input type="text"
            className='input input-bordered input-secondary w-full max-w-xs'
            value={programCode}
            onChange={(e) => setProgramCode(e.target.value)}
            placeholder="programCode" />
          <p>skill</p>
          <select name="" id=""
            className="select select-secondary w-full max-w-xs h-8"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          >
            {props.skills.map((value, index) => {
              return <option value={value.name as string}>{value.name}</option>
            }
            )}
          </select>

          <p>Type</p>
          <select name="" id=""
            className="select select-secondary w-full max-w-xs h-8"
            value={Type.Single}
            onChange={(e) => setType(e.target.value as Type)}
          >
            <option value={Type.Group}>Group</option>
            <option value={Type.House}>House</option>
            <option value={Type.Single}>Single</option>
          </select>
        </div>
        <div className="w-full  mt-4 flex items-center justify-between">
          <button
            type="submit"
            className="bg-secondary w-1/2 border-2 text-white px-3 flex-1 py-2 border-secondary rounded-xl font-bold"
          >
            {isLoading ? "Loading..." : "Submit"}
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
      <Alert isError={isError} setError={setIsError} isSuccess={isSuccess}>

      </Alert>
    </div>
  );
}

export default EditProgramme