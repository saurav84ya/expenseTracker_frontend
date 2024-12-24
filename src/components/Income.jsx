import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '@/hooks/use-toast'
import { addIncome, delIncome, getIncome } from '@/store/tranisations'
import { BadgeX, Bitcoin, CircuitBoard, LibraryBig, MessageCircleMore, NotepadTextDashed, Youtube } from 'lucide-react'
import { MyContext } from '@/MyContext'

const incomeIcons = {
  frelancing: <CircuitBoard size={40} />,
  Job: <NotepadTextDashed size={40} />,
  digital: <Bitcoin size={40} />,
  yt: <Youtube size={40} />,
  other: <LibraryBig size={40} />,
}

export default function Income() {
  const dispatch = useDispatch()
  const { isFetchIncomeLoading, fetchData,balance, message } = useSelector((state) => state.incomeSlice)
  const { user } = useSelector((state) => state.authSlice)
  const { toast } = useToast()
  const {setTotalI} = useContext(MyContext)


  // console.log("fetchData" ,fetchData)
  // console.log("balance" , balance)
// 
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    date: '',
    userId: user?.id,
  })

  const [refreshTrigger, setRefreshTrigger] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddIncome = (e) => {
    e.preventDefault()
    dispatch(addIncome(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message || 'Income added successfully',
        })
        setFormData({
          title: '',
          amount: '',
          category: '',
          description: '',
          date: '',
          userId: user?.id,
        })
        setRefreshTrigger((prev) => !prev) // Trigger re-fetch
      } else {
        toast({
          title: data?.payload?.message || 'Server not responding',
          variant: 'destructive',
        })
      }
    })
  }

  const handleDeleteIncome = (incomeId) => {
    dispatch(delIncome({ userId: user.id, incomeId })).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: 'Income deleted successfully',
        })
        setRefreshTrigger((prev) => !prev) // Trigger re-fetch
      } else {
        toast({
          title: 'Failed to delete income',
          variant: 'destructive',
        })
      }
    })
  }

  useEffect(() => {
    dispatch(getIncome(user?.id))
  }, [dispatch, user?.id, refreshTrigger])

  const inputClasss = 'border-[2px] h-10 w-full p-3 border-white rounded-[5px]'

  const totalIncome = fetchData?.reduce((sum, item) => sum + Number(item.amount), 0) || 0;

  return (
    <>
      {/* <h1 className="font-bold text-2xl mt-7 ml-4 text-center">Incomes</h1> */}
      <div className='font-bold text-2xl my-7 ml-4 text-center' >
        <h2>Total Income : <span  className='text-green-500' >${totalIncome}</span></h2>
      </div>
      <div className="flex md:flex-row-reverse justify-center lg:gap-0 xl:gap-4 flex-col">
        <div>
          <div className="flex flex-col items-center gap-3 p-5 overflow-y-auto overflow-x-hidden h-[500px] md:h-[800px] lg:h-[600px] w-full">
            {fetchData?.map((item, index) => (
              <div
                // onRander={() =>  {totalIncome = totalIncome + Number(item.amount)} }
                key={index}
                className="flex relative items-center p-2 border-2 rounded-[20px] w-full md:w-[420px] border-white hover:border-black gap-3"
              >
                <div className="w-[55px] h-[55px] flex items-center justify-center border-2 border-white hover:border-black rounded-2xl">
                  {incomeIcons[item.category] || <LibraryBig />}
                </div>
                <div>
                  <div className="relative">
                    <div className="absolute w-[10px] h-[10px] top-2 rounded-full bg-green-400"></div>
                    <p className="ml-4 font-bold">
                      {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <p>
                      <span className="font-bold">$</span> {item.amount}
                    </p>
                    <p>{item.date}</p>
                    <div className="flex gap-1 items-center">
                      <span className="font-bold">
                        <MessageCircleMore size={15} />
                      </span>
                      <p className="w-[90px]">{item.description}</p>
                    </div>
                    <button
                      className="md:p-2 p-1 bg-violet-900 hover:bg-red-500 text-white rounded-full absolute md:right-3 right-1 md:top-4 top-1"
                      onClick={() => handleDeleteIncome(item._id)}
                    >
                      <BadgeX />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4">
          <form onSubmit={handleAddIncome} className="flex flex-col gap-3">
            <input
              className={`${inputClasss}`}
              type="text"
              name="title"
              placeholder="Salary Title"
              value={formData.title}
              onChange={handleChange}
            />
            <input
              className={`${inputClasss}`}
              type="number"
              name="amount"
              placeholder="Salary Amount in $"
              value={formData.amount}
              onChange={handleChange}
            />
            <input
              className={`${inputClasss}`}
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            <div className="flex items-center gap-3">
              <textarea
                className={`${inputClasss} h-[100px]`}
                name="description"
                placeholder="Add A Reference"
                value={formData.description}
                onChange={handleChange}
              />
              <select
                className={`${inputClasss} w-[150px] h-[60px]`}
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">select</option>
                <option value="frelancing">Freelancing</option>
                <option value="Job">Job earning</option>
                <option value="digital">Digital marketing</option>
                <option value="yt">YT revenue</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button
              className="text-white text-center font-bold p-2 bg-pink-600 hover:bg-pink-500 rounded-[10px]"
              type="submit"
            >
              {isFetchIncomeLoading ? (
                <div className="justify-center items-center  flex" >
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                </div>
              ) : (
                '+ Add Income'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
