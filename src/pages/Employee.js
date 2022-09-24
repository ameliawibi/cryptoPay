import { useState } from "react";
import { useParams } from "react-router-dom";
import EmployeeEdit from "../components/EmployeeEdit";
import EmployeeView from "../components/EmployeeView";

export default function Employee() {
  const [editForm, renderEditForm] = useState(false);
  let params = useParams();
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Employee {params.employeeId}</h2>

      {editForm ? (
        <EmployeeEdit
          userId={params.employeeId}
          onClose={() => renderEditForm(false)}
        />
      ) : (
        <>
          <button onClick={() => renderEditForm(true)}>Edit</button>{" "}
          <EmployeeView userId={params.employeeId} />
        </>
      )}
    </main>
  );
}
