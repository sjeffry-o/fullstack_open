import { useState, React } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import TogglableBlog from './TogglableBlog'

test('renders title author and not likes url', () => {
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

  render(
    <TogglableBlog blog={blog} buttonLabel='show'>
      <Blog blog={blog} blogs={[blog]} />
    </TogglableBlog>
  )

  const authorTitle = screen.getAllByText(blog.title + ` ${blog.author}`)
  expect(authorTitle).toBeDefined()
  const likes = screen.queryByText(blog.likes)
  expect(likes).toBeNull()
  const url = screen.queryByText(blog.url)
  expect(url).toBeNull()
})
