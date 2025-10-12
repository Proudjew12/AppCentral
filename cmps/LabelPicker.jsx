

export function LabelPicker({labels,selectedLabels,setSelectedLabels}){
    
    function isSelectedLabel(label){
    labels.forEach(item => {
        if(item===label) return true
    });
    return false
    }
    function onAddSelectedLabel(label){
    selectedLabels.push(label)
    setSelectedLabels(selectedLabels)
    }
    function onRemoveSelectedLabel(label){
    const idx = selectedLabels.indexOf(label)
    labels.splice(idx,1)   
    setSelectedLabels(selectedLabels)
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