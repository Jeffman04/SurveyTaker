import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './main.css';

function Survey(){

    const [fullname, setfullname] = useState("");
    const [email, setemail] = useState("");
    const [contactnumber, setcontactnumber] = useState("");
    const [food,setfood] = useState([]);
    const [movies, setmovies] = useState("");
    const [Radio, setRadio] = useState("");
    const [Eatout, setEatout] = useState("");
    const [Tv, setTV] = useState("");
    const [dateofbirth, setDateOfBirth] = useState("");
    const [ageError, setAgeError] = useState("");

    const [fullnameValid, setFullnameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [contactnumberValid, setContactNumberValid] = useState(true);

    const validateInputs = () => {
        setFullnameValid(!!fullname);
        setEmailValid(!!email);
        setContactNumberValid(!!contactnumber);

        return !!fullname && !!email && !!contactnumber;
    }
    const handleDateOfBirthChange = (e) => {
        const inputDate = new Date(e.target.value);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - inputDate.getFullYear();
        if (age < 5 || age > 120) {
            setAgeError("Age must be between 5 and 120 years old.");
        } else {
            setAgeError("");
            setDateOfBirth(e.target.value);
        }
    };

    const getFood = (e) => {
        const { value, checked } = e.target;
        console.log(`${value} is ${checked}`);
    
        if (checked) {
            // Uncheck all other checkboxes
            const checkboxes = document.querySelectorAll('.checkbox');
            checkboxes.forEach((checkbox) => {
                if (checkbox !== e.target) {
                    checkbox.checked = false;
                }
            });
    
            // Update state
            setfood([value]);
        } else {
            // If unchecking, remove the value from state
            setfood([]);
        }
    };
    
    

    const submit = () => {
        // Check if all required fields are filled
        if (!validateInputs() || !movies || !Radio || !Eatout || !Tv || food.length === 0) {
            alert("Please fill out all fields");
            return; // Prevent submission
        }
    
        // Check if the user has already submitted the survey
        Axios.get(`http://localhost:8081/survey/exists?email=${email}`)
            .then((response) => {
                if (response.data.exists) {
                    alert("You have already submitted the survey.");
                } else {
                    // Proceed with the form submission
                    Axios.post("http://localhost:8081/create", {
                        fullname: fullname,
                        email: email,
                        dateofbirth: dateofbirth,
                        contactnumber: contactnumber,
                        food: food,
                        movies: movies,
                        Radio: Radio,
                        Eatout: Eatout,
                        Tv: Tv
                    }).then(() => {
                        alert("Success");
                        setfullname("");
                        setemail("");
                        setcontactnumber("");
                        setfood([]);
                        setmovies("");
                        setRadio("");
                        setEatout("");
                        setTV("");
                        setDateOfBirth("");
                        setAgeError("");
                        setFullnameValid(true);
                        setEmailValid(true);
                        setContactNumberValid(true);
                    }).catch((error) => {
                        console.error("Error:", error);
                        alert("An error occurred. Please try again.");
                    });
                }
            }).catch((error) => {
                console.error("Error:", error);
                alert("An error occurred. Please try again.");
            });
    };
    
    
return(
    <div>
        <header className='header1'>
            <div>
                <h3>_Survey</h3>
                <div className='header_div'>
                    <h2 className='header_h2'>FILL OUT SURVEY</h2>
                    <Link to="/surveydetails" className='link'><h2>VIEW SURVEY RESULTS</h2></Link>
                </div>   
            </div>
        </header>
        <div>
            
                <p>personal detail:</p>
                
            <div className='label_input'>
                <div>
                <label>Full Names</label>
                <br/>
                <input type='text' required value={fullname}
            onChange={(e)=>{
                setfullname(e.target.value)
            }} style={{ borderColor: fullnameValid ? '' : 'red' }}/>
                </div>
                <br/>
                <div>
                    <label>Email</label>
                    <br/>
                    <input type='email' required value={email}
                    onChange={(e)=>{
                        setemail(e.target.value);
                    }}style={{ borderColor: emailValid ? '' : 'red' }}/>
                </div>
                <br/>
                <div>
                    <label>Date of Birth</label>
                    <br/>
                    <input type='date' required value={dateofbirth}
                    onChange={handleDateOfBirthChange}/>
                    {ageError && <p style={{ color: 'red' }}>{ageError}</p>}
                </div>
                <br/>
                <div>
                    <label>Contact Number</label>
                    <br/>
                    <input type='tel' max={10} value={contactnumber}
                    onChange={(e)=>{
                        const inputVal = e.target.value.trim();
                        if (/^\d{10}$/.test(inputVal)){
                            setcontactnumber(inputVal);
                        }
                    }}style={{ borderColor: contactnumberValid ? '' : 'red' }}/>
                </div>
            </div>
        </div>
        <div className='checkboxes'>
                <p>What is your favorite food?</p>
                
                <input className='checkbox' type='checkbox' name='Pizza' value="Pizza" onChange={(e) => getFood(e)}/>
                <label htmlFor='Pizza'>Pizza</label>
                
                <input className='checkbox'type='checkbox' name='Pasta' value="Pasta" onChange={(e) => getFood(e)} />
                <label htmlFor='Pizza'>Pasta</label>
                
                <input className='checkbox' type='checkbox' name='Pap and Wors' value="Pap and wors" onChange={(e) => getFood(e)} />
                <label htmlFor='Pizza'>Pap and wors</label>
                <input className='checkbox' type='checkbox' name='Other' value="Other" onChange={(e) => getFood(e)} />
                <label htmlFor='Pizza'>other</label>
            </div>
        <p>Please rate your level of agreement on the scale of 1 to 5, with 1 being "strongly agree"
            and 5 being  "strongly disagree".
        </p>
        <table className='rates'>
            <thead>
                <tr className='table_head'>
                    <th></th>
                    <th>Strongly Agree</th>
                    <th>Agree</th>
                    <th>Nuetral</th>
                    <th>Disagree</th>
                    <th>Strongly Disagree</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='table_r'>I like to watch movies</td>
                    <td><input className='radio' type='radio' name='Movies' value="1" onChange={(e) => setmovies(e.target.value)}/></td>
                    <td><input className='radio' type='radio' name='Movies' value="2" onChange={(e) => setmovies(e.target.value)}/></td>
                    <td><input className='radio' type='radio' name='Movies' value="3" onChange={(e) => setmovies(e.target.value)}/></td>
                    <td><input className='radio' type='radio' name='Movies' value="4" onChange={(e) => setmovies(e.target.value)}/></td>
                    <td><input className='radio' type='radio' name='Movies' value="5" onChange={(e) => setmovies(e.target.value)}/></td>
                </tr>
                <tr>
                    <td className='table_r'>I like to listen to radio</td>
                    <td><input className='radio' type='radio' name='Radio' value="1" onChange={(e) => setRadio(e.target.value)}/></td>
                    <td><input className='radio' type='radio' name='Radio' value="2" onChange={(e) => setRadio(e.target.value)}/></td>
                    <td><input className='radio' type='radio' name='Radio' value="3" onChange={(e) => setRadio(e.target.value)}/></td>
                    <td><input className='radio' type='radio' name='Radio' value="4" onChange={(e) => setRadio(e.target.value)}/></td>
                    <td><input className='radio' type='radio' name='Radio' value="5" onChange={(e) => setRadio(e.target.value)}/></td>
                </tr>
                <tr>
                    <td className='table_r'>I like to eat out</td>
                    <td><input className='radio' type='radio' name='Eatout' value="1" onChange={(e) => setEatout(e.target.value)}/></td>
                    <td><input className='radio' type='radio' name='Eatout' value="2" onChange={(e) => setEatout(e.target.value)}/></td>
                    <td><input className='radio' type='radio' name='Eatout' value="3" onChange={(e) => setEatout(e.target.value)}/></td>
                    <td><input className='radio' type='radio' name='Eatout' value="4" onChange={(e) => setEatout(e.target.value)}/></td>
                    <td><input className='radio' type='radio' name='Eatout' value="5" onChange={(e) => setEatout(e.target.value)}/></td>
                </tr>
                <tr>
                    <td className='table_r'>I like to watch TV</td>
                    <td><input className='radio' type='radio' name='Tv' value="1" onChange={(e) => setTV(e.target.value)}/></td>
                    <td><input className='radio' type='radio' name='Tv' value="2" onChange={(e) => setTV(e.target.value)}/></td>
                    <td><input className='radio' type='radio' name='Tv' value="3" onChange={(e) => setTV(e.target.value)}/></td>
                    <td><input className='radio' type='radio' name='Tv' value="4" onChange={(e) => setTV(e.target.value)}/></td>
                    <td><input className='radio' type='radio' name='Tv' value="5" onChange={(e) => setTV(e.target.value)}/></td>
                </tr>
            </tbody>
        </table>

        <button className='btn' onClick={submit}>SUBMIT</button>
    </div>
)
}
export default Survey;