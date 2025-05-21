import { useEffect, useState } from 'react'

function Activities() { //siempre con mayuscula la funcion

    const [activities, setActivities] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/activites') //hago la peticion como postman, llamda http
            .then((rest) => {  //cuando devuelva algo
                return rest.json();
            })

            .then((data) => {
                setActivities(data);
            })
    })

    return (
        <div>
            <h1>{activities && activities.name}</h1> verifico si hotel es null, si no lo es lo muestra

        </div>
    );
}

export default Activities;