import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState } from 'react'
import Dropdown from './Dropdown';

export default function SignUp() {

    const genderList = [
      { id: 1, gender: 'Male' },
      { id: 2, gender: 'Female' },
      { id: 3, gender: 'Others' },
    ]

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState(genderList[0]);
    const [selected, setSelected] = useState(genderList[1])

    const handleSignup = async (e) => {
        e.preventDefault();
        const formData = {
          email,
          password,
          name,
          gender: gender.gender,
        }
        console.log(formData);

        try {

          const res = await fetch('http://localhost:5000/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });


          if( ! res.ok ) {
            throw new Error('Something went wrong');
          }

          const data = await res.json();

          console.log(data);
          
          // console.log(data);


          // if(res.status === 201) {
          //   alert('User created successfully');
          // }else{
          //   alert(data);
          // }
        } 
        catch (error) {
          console.log(error.message);
        }
    }


    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Create your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" className="space-y-6 ring-1 p-7 rounded ring-inset ring-gray-300" onSubmit={handleSignup}>

                <div>
                    <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                        Full Name
                    </label>
                    <div className="mt-2">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        
                        autoComplete="username"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Email address
                    </label>
                    <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                    </div>
                </div>
    
                <div>
                    <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                        Password
                    </label>
                    </div>
                    <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                    </div>
                </div>
                
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="gender" className="block text-sm/6 font-medium text-gray-900">
                            Gender
                        </label>
                    </div>
                    <div className="mt-2">
                    <Listbox value={selected} onChange={setSelected}>
                      <ListboxButton
                        className={clsx(
                          'block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 relative text-left',
                          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                        )}
                      >
                        {selected.gender}
                        <ChevronDownIcon
                          className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-gray-900"
                          aria-hidden="true"
                        />
                      </ListboxButton>
                      <ListboxOptions
                        anchor="bottom"
                        transition
                        className={clsx(
                          'rounded-xl border border-white/5 bg-black p-1 focus:outline-none',
                          'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                        )}
                      >
                        {genderList.map((genderItem) => (
                          <ListboxOption
                            key={genderItem.gender}
                            value={genderItem}
                            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                          >
                            <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                            <div className="text-sm/6 text-white">{genderItem.gender}</div>
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Listbox>
                    </div>
                </div>

                <div>
                    <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Sign up
                    </button>
                </div>
            </form>
  
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Already a member?{' '}
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Login
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
  