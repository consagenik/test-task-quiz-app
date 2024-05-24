import {EditingQuestion} from "../../entities/EditingQuestion";

import {ApiQuestionType} from "../../api/entities/ApiQuestionType";

import {Text} from "../common/text";
import {Button} from "../common/button";
import TextIcon from "../../assets/icons/Text.svg";
import RadioButton from "../../assets/icons/RadioButton.svg";
import Checkbox from "../../assets/icons/Checkbox.svg";

interface PassiveQuestionItemProps {
  question: EditingQuestion
  onClickEdit: () => void
  onClickDelete: () => void
}

function getQuestionTypeIcon(type: ApiQuestionType) {
  let icon;

  switch (type) {
    case 'text':
      icon = TextIcon;
      break;
    case 'selectOne':
      icon =  RadioButton;
      break;
    case 'selectMany':
      icon =  Checkbox;
      break;
  }

  return icon;
}

export default function PassiveQuestionItem({question, onClickEdit, onClickDelete}: PassiveQuestionItemProps) {
  return (
    <div className="passiveQuestionItem">
      <div className="info">
        <img src={getQuestionTypeIcon(question.type)} alt={question.type}/>
        <Text text={question.name}/>
      </div>

      <div className="actionButtons">
        <Button text="Edit" onClick={onClickEdit}/>
        <Button text="Delete" onClick={onClickDelete} />
      </div>
    </div>
  );
}
