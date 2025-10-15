
export function LabelPicker({labels,selectedLabels,setSelectedLabels}){
    
    function isSelectedLabel(label){
    labels.forEach(item => {
        if(item===label) return true
    });
    return false
    }
    function onAddSelectedLabel(label){
    setSelectedLabels([...setSelectedLabels,label])
    }
    function onRemoveSelectedLabel(removedLabel){   
    setSelectedLabels(selectedLabels.filter(label=>(label!==removedLabel)))
    }
    return(
    <ul>
    {labels.map(        
     label=>
        (isSelectedLabel)?
        <li>
          <div onClick={()=>{onRemoveSelectedLabel(label)}} className='selected-label'>{label}</div>  
        </li>
        :
        <li>
         <div onClick={()=>{onAddSelectedLabel(label)}} className=''>{label}</div>   
        </li>   
    )}
    </ul>
    )
}