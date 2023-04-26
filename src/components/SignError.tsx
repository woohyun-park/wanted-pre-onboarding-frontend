interface ISignError {
  error: string;
}

export default function SignError({ error }: ISignError) {
  return <p className="mb-8 text-xs italic text-red-500">{error}</p>;
}
