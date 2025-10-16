import { useState } from "react";

function NewMessageForm() {
    const [formData, setFormData] = useState({ author: "", message: ""});
    
    function updateFormData(e) {
        setFormData({
            ...formData, [e.target.name]: [e.target.value],
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const res = await fetch("http://localhost:8080/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        
        const data = await res.json();
        console.log(data);
    }
    
    return <form onSubmit={handleSubmit}>
    <input onChange={updateFormData} name="author" value={formData.author} placeholder="Name" type="text" />
    <input onChange={updateFormData} name="message" value={formData.message} placeholder="Message" type="text" />
    <button type="submit">Add Message</button>
    </form>
}

export default NewMessageForm;