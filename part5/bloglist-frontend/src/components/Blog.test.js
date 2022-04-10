import { useState, React } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import TogglableBlog from './TogglableBlog'

describe('<Blog />', () => {
  let container
  const buttonLabel = 'show'
  const setBlogs = jest.fn()
  beforeEach(() => {
    const blog = {
      author: "Not me",
      id: "624c0d412fbbced33c98e131",
      likes: 10,
      title: "New era of airplanes",
      url: "lol.com",
      user: {
        username: 'root', 
        name: 'Superuser', 
        id: '6236971787c7c68df5483ed4'
      }
    }

    container = render(
      <TogglableBlog blog={blog} buttonLabel={buttonLabel}>
        <Blog blog={blog} blogs={[blog]} setBlogs={setBlogs} />
      </TogglableBlog>
    ).container
  })
  

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = screen.getByText(buttonLabel)
    userEvent.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('after clicking like button 2 times, handler called 2 times too', () => {
    const button = screen.getByText('like')
    const attrib = Object.getOwnPropertyNames(button)
    const onClickFunc = button[attrib[1]].onClick
    userEvent.click(button)
    expect(onClickFunc).toHaveBeenCalledTimes(1)
  })
})
