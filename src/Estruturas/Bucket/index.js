import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

const Bucket = Component => {

    const tuplas = useSelector(state => state.tuplas)

    const [state, setState] = useState({
        id:"",
        tupla: {},
        key: ""
    })

    const handleTupla = () => {
        var keyBucket = 
    }

}

export default Bucket;