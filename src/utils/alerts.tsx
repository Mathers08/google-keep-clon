import alertConfirm, { Button } from "react-alert-confirm";
import React from "react";

const CustomAlert = async ({ callback }: any) => {
  await alertConfirm({
    maskClosable: true,
    title: "Вы уверены, что хотите удалить?",
    style: { borderRadius: '9px' },
    footer(dispatch) {
      return (
        <>
          <Button onClick={() => dispatch("cancel")}>
            Отмена
          </Button>
          <Button onClick={() => {
            callback();
            dispatch("cancel");
          }} styleType="danger">
            Удалить
          </Button>
        </>
      );
    },
  });
};

export default CustomAlert;