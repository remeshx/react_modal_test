import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { useModalDialog } from '../../hooks/useModalDialog';

const Heavy = (props) => {
  const {showConfirmDialog,closeModalDialog} = useModalDialog();

  let counter = useRef(0);
  const [clickCounter,setClickCounter] = useState(0);

  counter.current = counter.current+1;
 
  const clickHandler = ()=>{
    showConfirmDialog({
      content: `Are you sure you want to waitlist trip `,
      title: 'Waitlist Trip',
      footer: [{
        title: 'Cancel',
        onClick: () => {
            closeModalDialog();
          
        }
      }, {
        id: 'confirm',
        title: 'Confirm',
        loading: true,
        onClick: () => {
          closeModalDialog()
        }
      }]
    })   
  }

  return (
  <div>
    <Button onClick={clickHandler}>Click me ({clickCounter})</Button>
    Heavy Component rendered {counter.current}
  </div>  
  )
};

Heavy.propTypes = {};

Heavy.defaultProps = {};

export default Heavy;
