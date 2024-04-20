import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './results.css'

function SurveyDetails() {
    const [data, setSurveysDetails] = useState([]);
    const [surveyCount, setSurveyCount] = useState(0);
    const [averages, setAverages] = useState({
        movieAverage: 0,
        radioAverage: 0,
        eatoutAverage: 0,
        tvAverage: 0
    });
    const [foodCounts, setFoodCounts] = useState([]);
    const [ages, setAges] = useState([]);
    const [maxAge, setMaxAge] = useState(0);
    const [minAge, setMinAge] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8081/survey')
            .then(res => res.json())
            .then(data => setSurveysDetails(data))
            .catch(err => console.log(err));

        // Fetch survey count
        fetch('http://localhost:8081/survey/count')
            .then(res => res.json())
            .then(data => setSurveyCount(data.count))
            .catch(err => console.log(err));

        // Fetch averages
        fetch('http://localhost:8081/survey/rates')
            .then(res => res.json())
            .then(data => setAverages(data))
            .catch(err => console.log(err));

        // Fetch food counts
        fetch('http://localhost:8081/survey/food_count')
            .then(res => res.json())
            .then(data => setFoodCounts(data))
            .catch(err => console.log(err));

        // Fetch ages
        fetch('http://localhost:8081/survey/age')
            .then(res => res.json())
            .then(data => setAges(data))
            .catch(err => console.log(err));

        fetch('http://localhost:8081/survey/max_age')
            .then(res => res.json())
            .then(data => setMaxAge(data.maxAge))
            .catch(err => console.log(err));

        // Fetch min age
        fetch('http://localhost:8081/survey/min_age')
            .then(res => res.json())
            .then(data => setMinAge(data.minAge))
            .catch(err => console.log(err));
    }, []);

    // Calculate average age
    const calculateAverageAge = () => {
        const totalAge = ages.reduce((acc, curr) => acc + curr.age, 0);
        return totalAge / ages.length;
    };
    const calculateFoodPercentage = (foodName) => {
        const food = foodCounts.find(item => item.food === foodName);
        if (!food || !surveyCount) return "N/A"; // Handle case where data is not available
        return ((food.count / surveyCount) * 100).toFixed(1) + '%';
    };
    

    return (
        <div>
            <header>
                <div className='header'>
                    <h3 className='header_h3'>_Survey</h3>
                    <div className='header_links'>
                    <Link to="/" className='links'><h2>FILL OUT SURVEY</h2></Link>
                    <h2 className='header_h2'> VIEW SURVEY RESULTS</h2>
                    </div>
                    
                    
                </div>
            </header>
            
            <h1 className='results'>Survey Results</h1>
            
            <table className='table'>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='row'>Total Number of Surveys:</td>
                        <td className='row'>{surveyCount}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Average Age:</td>
                        <td>{calculateAverageAge().toFixed(1)}</td>
                    </tr>
                    <tr>
                        <td>Oldest Person Who Participated in Survey:</td>
                        <td>{maxAge? maxAge:'N/A'}</td>
                    </tr>
                    <tr>
                        <td>Youngest Person Who Participated in Survey:</td>
                        <td>{minAge? minAge:'N/A'}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Percentage of People who like Pizza:</td>
                        <td>{calculateFoodPercentage('Pizza')}</td>
                    </tr>
                    <tr>
                        <td>Percentage of People Who Like Pasta:</td>
                        <td>{calculateFoodPercentage('Pasta')}</td>
                    </tr>
                    <tr>
                        <td>Percentage of People Who Like Pap & Wors:</td>
                        <td>{calculateFoodPercentage('Pap and wors')}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>People Who Like To Watch Movies:</td>
                        <td>{averages.movieAverage ? averages.movieAverage.toFixed(1) : 'N/A'}</td>
                    </tr>
                    <tr>
                        <td>People Who Like To Listen To Radio:</td>
                        <td>{averages.radioAverage ? averages.radioAverage.toFixed(1) : 'N/A'}</td>
                    </tr>
                    <tr>
                        <td>People Who Like To Eat Out:</td>
                        <td>{averages.eatoutAverage ? averages.eatoutAverage.toFixed(1) : 'N/A'}</td>
                    </tr>
                    <tr>
                        <td>People Who Like To Watch Tv:</td>
                        <td>{averages.tvAverage ? averages.tvAverage.toFixed(1) : 'N/A'}</td>
                    </tr> 
                </tbody>
            </table>
        </div>
    );
};

export default SurveyDetails;
