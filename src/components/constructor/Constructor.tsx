import Equal from "../equal/Equal";
import Numbers from "../numbers/Numbers";
import Operators from "../operators/Operators";
import Result from "../result/Result";

export default function Constructor() {
  return(
    <div className="constructor">
      <Result />
      <Operators />
      <Numbers />
      <Equal />
    </div>
  )
}