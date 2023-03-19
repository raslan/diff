import { ChangeEventHandler, useState } from 'react';

const useFileReader = (): [
  string,
  ChangeEventHandler<HTMLInputElement>,
  Record<string, string>
] => {
  const [file, setFile] = useState<string>('');
  const [metadata, setMetadata] = useState<Record<string, any>>({});
  const handler: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target?.files?.[0];
    console.log(file);
    if (
      file?.type.includes('text/') ||
      file?.type.includes('json') ||
      file?.type.includes('xml')
    ) {
      try {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file as Blob);
        setMetadata({
          name: file?.name || '',
        });
        fileReader.onload = (e) => {
          setFile(
            (new TextDecoder('utf-8').decode(
              e?.target?.result as BufferSource | undefined
            ) || '') as string
          );
        };
      } catch (error) {
        console.log(error);
      }
    }
  };
  return [file, handler, metadata];
};
export default useFileReader;
