import React from 'react'
import { Form } from 'react-router-dom'
import { UserPlusIcon } from '@heroicons/react/24/solid'
import illustration from '../assets/illustration.jpg'
import Button from './Button'
const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your
          journey today.
        </p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="What is your name?"
            aria-label="Your name"
            autoComplete="given-name"
          />

          <input type="hidden" name="_user_action" value="newUser" />
          <Button text="Create Account" Icon={<UserPlusIcon width={20} />} />
        </Form>
      </div>
      <img src={illustration} alt="" />
    </div>
  )
}

export default Intro
