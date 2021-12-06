import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Confirm } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

interface Props {
  jobId: string;
}

export default observer(function DeleteJobButton({ jobId }: Props) {
  const {
    jobStore: { loading, deleteJob },
  } = useStore();
  const [hoverDeleteButton, setHoverDeleteButton] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [target, setTarget] = useState("");
  return (
    <>
      <Button
        icon="trash"
        className={`jobListItem-deleteButton ${hoverDeleteButton ? "red" : ""}`}
        basic
        onMouseEnter={() => setHoverDeleteButton(true)}
        onMouseLeave={() => setHoverDeleteButton(false)}
        onClick={(e) => {
          setOpenConfirmModal(true);
          setTarget(e.currentTarget.name);
        }}
        loading={loading && target === `button${jobId}`}
        name={`button${jobId}`}
      />
      <Confirm
        className="jobListItem-confirmDeleteModal"
        header="Delete job offer"
        open={openConfirmModal}
        onCancel={() => setOpenConfirmModal(false)}
        onConfirm={() => {
          deleteJob(jobId);
          setOpenConfirmModal(false);
        }}
        size="mini"
      />
    </>
  );
});
