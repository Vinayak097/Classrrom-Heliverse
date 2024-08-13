import React from 'react'

function ClassroomsCard({name,teacher,students}) {
  let count=students.length;
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">{name? name:"Card title!"}</h2>

    <div className='flex justify-between'>
      <p>Teacher: </p>
      <h2>{teacher.email?teacher.email:"None"}</h2>      
    </div>
    <div className='flex justify-between'>
      <p>Students :  </p>
      <h2>{count? count:0}</h2>      
    </div>
    
    <div className="card-actions justify-start">
      <button className="btn btn-outline ">View</button>
    </div>
  </div>
</div>
  )
}

export default ClassroomsCard


/*{
<Card>
    <CardHeader>
      <CardTitle>Classrooms</CardTitle>
      <CardDescription>Manage your classrooms</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
        <Button>Create Classroom</Button>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="font-medium">Math Class</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button variant="outline" size="sm" color="destructive">
                Delete
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="font-medium">English Class</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button variant="outline" size="sm" color="destructive">
                Delete
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="font-medium">Science Class</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button variant="outline" size="sm" color="destructive">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
}*/