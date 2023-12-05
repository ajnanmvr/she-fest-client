interface Props {
  className: string;
  SetOpen: any;
  open: boolean;
}

export function ArrowRightSquare(props: Props) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      className={props.className}
      onClick={() => props.SetOpen(false)}
    >
      <path
        fillRule="evenodd"
        d="M15 2a1 1 0 00-1-1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2zM0 2a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2zm4.5 5.5a.5.5 0 000 1h5.793l-2.147 2.146a.5.5 0 00.708.708l3-3a.5.5 0 000-.708l-3-3a.5.5 0 10-.708.708L10.293 7.5H4.5z"
      />
    </svg>
  );
}
export function ChevronRight(props: Props) {
  return (
    <svg
      className={props.className}
      onClick={() => props.SetOpen(false)}
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
    >
      <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
    </svg>
  );
}

export function ChevronLeft(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      className={props.className}
      onClick={() => props.SetOpen(false)}
    >
      <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
    </svg>
  );
}

export function IconArrowLeftSquare(props: Props) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      className={props.className}
      onClick={() => props.SetOpen(true)}
    >
      <path
        fillRule="evenodd"
        d="M15 2a1 1 0 00-1-1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2zM0 2a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2zm11.5 5.5a.5.5 0 010 1H5.707l2.147 2.146a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 11.708.708L5.707 7.5H11.5z"
      />
    </svg>
  );
}

export function ArrowRightSquareForRight(props: Props) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      className={props.className}
      onClick={() => props.SetOpen(!props.open)}
    >
      <path
        fillRule="evenodd"
        d="M15 2a1 1 0 00-1-1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2zM0 2a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2zm4.5 5.5a.5.5 0 000 1h5.793l-2.147 2.146a.5.5 0 00.708.708l3-3a.5.5 0 000-.708l-3-3a.5.5 0 10-.708.708L10.293 7.5H4.5z"
      />
    </svg>
  );
}

export function IconArrowLeftSquareForRight(props: Props) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      className={props.className}
      onClick={() => props.SetOpen(!props.open)}
    >
      <path
        fillRule="evenodd"
        d="M15 2a1 1 0 00-1-1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2zM0 2a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2zm11.5 5.5a.5.5 0 010 1H5.707l2.147 2.146a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 11.708.708L5.707 7.5H11.5z"
      />
    </svg>
  );
}
