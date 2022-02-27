/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (properties, obj) => {
  if(Array.isArray(obj)){
    return obj.map(item=>{
      const item2 = {...item}
      if(Array.isArray(properties)){
        properties.forEach(p=>{
          delete item2[p]
        })
        return item2
      } else if(typeof properties === 'number' || typeof properties === 'string'){
        delete item2[properties]
        return item2
      } else {
        return obj
      }
    })
  } else if(typeof obj==='object'){
    const obj2 = {...obj}
    if(Array.isArray(properties)){
      properties.forEach(p=>{
        delete obj2[p]
      })
      return obj2
    } else if(typeof properties === 'number' || typeof properties === 'string'){
      delete obj2[properties]
      return obj2
    } else {
      return obj
    }
  } else return obj
};

exports.excludeByProperty = (property, arr) => {
  if(!property){return arr}
  if(!Array.isArray(arr)){
    return arr
  } 
  return arr.filter(v=>!v[property])
};

exports.sumDeep = (arr) => {
  if(!Array.isArray(arr)){ return []}
  return arr.map(subarr=>{
    return {objects: subarr.objects.reduce((total, currentVal)=>total+currentVal.val, 0)}
  })
};

exports.applyStatusColor = (colors, statusArr) => {
  if(typeof colors !== 'object' || !Array.isArray(statusArr)){
    return null
  }
  let colorMap = {}
  Object.keys(colors).forEach(color=>{
    colors[color].forEach(s=>colorMap[s]=color)
  })
  let statusArr2 = []
  statusArr.forEach(status=>{
    colorMap[status.status] && statusArr2.push({...status, color: colorMap[status.status]})
  })
  return statusArr2
};

exports.createGreeting = (func, ...args) => {
  const ctx = this
  return function(){
    return func.call(ctx, ...args, ...arguments)
  }
};


exports.setDefaults = (property) => {
  if(typeof property !== 'object'){
    return function(){}
  }
  const ctx = this
  return function(source){
    const defaults = {}
    Object.keys(property).forEach(p=>{
      if(property[p]===true){
        if(source[p]===undefined) source[p] = true
      }
    })
    return source
  }
};

exports.fetchUserByNameAndUsersCompany = async (username, services) => {
  const [users, status] = await Promise.all([services.fetchUsers(), services.fetchStatus()])
  const user = users.find(item => item.name === username)
  const company = await services.fetchCompanyById(user.companyId)
  return {user, company, status}
};
