import { Candidate } from "@/gql/graphql"

interface Props {
    candidates: Candidate[]
}
export default function Candidates(props: Props) {
    const { candidates } = props
    return (
        <div className=" flex flex-col">
            <h1 className="self-center text-primary">Candidates</h1>
            <ul className="grid grid-cols-3 gap-4 w-full self-center">
                {candidates.map((candidate: Candidate) => {
                    return (
                        <li key={candidate.id} className="border-4 border-primary">
                            <p>{candidate.id}</p>
                            <p>{candidate.name}</p>
                            <p>{candidate.chestNO}</p>
                            <p>{candidate.category?.name}</p>
                            <p>{candidate.team?.name}</p>
                            <button className="bg-primary text">Create Candidate</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}