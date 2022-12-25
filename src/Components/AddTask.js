import { useState } from 'react'

const AddTask = ({onAdd}) => {
	const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
    	e.preventDefault()

    	if (!text) {
    		alert ('please add a task')
    		return
    	}

    	onAdd({text,day,reminder})

    	setText('')
    	setDay('')
    	setReminder(false)
    	//reset fields
    }
 
	//e.targetValue = whatever is typed in the field
	//e = an event object
	//e.currentTarget.checked = for checking and returning true or false, is it checked or not. (checkbox)

	return (
		<form className = 'add-form' onSubmit = {onSubmit} >
		   <div className = 'form-control'>
		   <label> Task </label>
		   <input type = 'text' 
		   placeholder = 'add text'
		   value = {text}
		   onChange = {(e)=> setText(e.target.value)}/>
		   </div> 
		  
		   <div className = 'form-control'>
		   <label> Day & Time </label>
		   <input type = 'text' 
		   placeholder = 'add Day & Time'
		   value = {day}
		   onChange = {(e)=> setDay(e.target.value)}/>
		   </div>

		   <div className = 'form-control-check'>
		   <label> Set Reminder </label>
		   <input type = 'checkbox' 
		   checked = {reminder}
		   //setting checked = true reminder, unchecked = false reminder
		   value = {reminder}
		   onChange = { (e)=> setReminder(e.currentTarget.checked) }/>
		   </div>

		   <input type = 'submit' value = 'Save Task' className = 'btn-btn-block' />
		</form>
		
		
	)
}


export default AddTask