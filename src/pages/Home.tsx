import { ApiRequest } from "../components/ApiRequest";
import { InperativaHandle } from "../components/InpirativeHandle";
import { ComponentMultiSelect } from "../components/MultiSelect";

export function Home() {
  return (
    <>
      <ComponentMultiSelect />
      <InperativaHandle />
      <ApiRequest />
    </>
  )
}