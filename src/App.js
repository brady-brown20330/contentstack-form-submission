import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  const [formData, setFormData] = useState({title: "",brand_item: "",image: '', link_title: "", link: ""});
  // const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };


  // const handleImage = (event) => {
  //   const { name, value } = event.target.files[0];
  //   console.log('should be the image', event.target.files[0]); // Log the selected file
  //   setFormData(formData.image); // Update the state with the selected file
  // }

  // this needs to submit data to Contentstack
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('https://app.contentstack.com/automations-api/run/4e7cf4d3154444b582f566a80ffdffe7', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
    });
    
};

  return (
    <div className='App'>
    <form onSubmit={handleSubmit} className='App-header'>
    <h1>Upload Your Content Below</h1>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}/>

      <label htmlFor="brand_item">Brand Item:</label>
      <input type="text" id="brand_item" name="brand_item" value={formData.brand_item} onChange={handleChange}/>

      <label htmlFor="image">Image:</label>
      <input
        type="file"
        name="myImage"
        // Event handler to capture file selection and update the state
        // onChange={(event) => {
        //   console.log(event.target.files[0]); // Log the selected file
        //   setSelectedImage(event.target.files[0]); // Update the state with the selected file
        // }}
        onChange={handleChange}
      />

      <label htmlFor="link">Link:</label>
      <input type="text" id="link_title" name="link_title" value={formData.link_title} onChange={handleChange}/>
      <input type="text" id="link" name="link" value={formData.link} onChange={handleChange}/>

      <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default App;
