import {
  Detail,
  EditSettingsDocument,
  EditSettingsMutation,
  EditSettingsMutationVariables,
} from "@/gql/graphql";
import React from "react";
import { OperationResult, useMutation } from "urql";

interface Props {
  id: number;
  name: string;
  logoId: string;
  motto: string;
  institution: string;
  coverId: string;
  isMediaHave: boolean;
  isSkillHave: boolean;
  data: Detail[];
  setData: React.Dispatch<React.SetStateAction<Detail[]>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditSettings = (props: Props) => {
  const [name, setName] = React.useState<string>(props.name);
  const [logoId, setLogoId] = React.useState<string>(props.logoId);
  const [motto, setMotto] = React.useState<string>(props.motto);
  const [institution, setInstitution] = React.useState<string>(
    props.institution
  );
  const [coverId, setCoverId] = React.useState<string>(props.coverId);
  const [isMediaHave, setIsMediaHave] = React.useState<boolean>(
    props.isMediaHave
  );
  const [isSkillHave, setIsSkillHave] = React.useState<boolean>(
    props.isSkillHave
  );

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [state, UpdateSettingsExecute] = useMutation(EditSettingsDocument);

  const HandleSubmit = async (data: any) => {
    console.log(data);

    setIsLoading(true);
    const updatedData: OperationResult<
      EditSettingsMutation,
      EditSettingsMutationVariables
    > = await UpdateSettingsExecute({
      id: props.id,
      name: data.name,
      logoId: data.logoId,
      motto: data.motto,
      institution: data.institution,
      coverId: data.coverId,
      isMediaHave: data.isMediaHave,
      isSkillHave: data.isSkillHave,
    });

    console.log(updatedData);

    if (updatedData.data?.updateDetail) {
      alert("Settings Updated");
      const updatedDates = props.data.map((value, index) => {
        if (value.id == updatedData.data?.updateDetail?.id) {
          return (value = updatedData.data?.updateDetail as Detail);
        } else {
          return value;
        }
      });
      console.log(updatedDates);

      props.setData(updatedDates as Detail[]);
    } else if (updatedData.error?.message) {
      alert(updatedData.error?.message.split("]")[1]);
    } else {
      alert("Settings Not Updated");
    }
    setIsLoading(false);
    props.setIsEdit(false);
  };

  return (
    <div>
      <button className="bg-green-500" onClick={() => props.setIsEdit(false)}>
        Back
      </button>
      <h1>Edit Settings</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          HandleSubmit({
            name,
            logoId,
            motto,
            institution,
            coverId,
            isMediaHave,
            isSkillHave,
          });
        }}
      >
        <p>Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <p>logoId</p>
        <input
          type="text"
          value={logoId}
          onChange={(e) => setLogoId(e.target.value)}
          placeholder="logoId"
        />
        <p>motto</p>
        <input
          type="text"
          value={motto}
          onChange={(e) => setMotto(e.target.value)}
          placeholder="motto"
        />
        <p>institution</p>
        <input
          type="text"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          placeholder="institution"
        />
        <p>coverId</p>
        <input
          type="text"
          value={coverId}
          onChange={(e) => setCoverId(e.target.value)}
          placeholder="coverId"
        />
        <button className="bg-fuchsia-600" type="submit">
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EditSettings;
