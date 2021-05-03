import React from 'react';

export default function InputField(props) {
  return (
    <div className="todo-input-field">
      <input placeholder="入力しよう" value={props.text} onChange={e => props.handleChange(e)}></input>
      <button onClick={props.handleSubmit}>保存</button>
    </div>
  )
}