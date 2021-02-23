import { useEffect, useState } from "react";

const useTitle = (pageTitle: string = "Instagram") => {
  const [title, setTitle] = useState<string>(pageTitle);

  useEffect(() => {
    document.title = `${title} - Instagram`;
    setTitle(pageTitle);
  }, [title, pageTitle]);

  return { title };
};

export default useTitle;
