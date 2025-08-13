'use client'

import { useState } from 'react'

export default function SubmitShop() {
  const [shopName, setShopName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [images, setImages] = useState<File[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('shopName', shopName)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('lat', lat)
    formData.append('lng', lng)

    if (coverImage) {
      formData.append('coverImage', coverImage)
    }

    images.forEach((file) => {
      formData.append('shopImages', file)
    })

    const token = localStorage.getItem('access_token')
    const res = await fetch('http://localhost:8000/api/shops/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    const data = await res.json()

    if (res.ok) {
      alert('Shop added!')
    } else {
      console.error('Error:', data)
      alert('Failed to add shop')
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Shop Name</label>
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div>
          <label>Latitude</label>
          <input
            type="number"
            step="any"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Longitude</label>
          <input
            type="number"
            step="any"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            required
          />
        </div>

        <div>
          <label>Shop Images (multiple)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit">Add Shop</button>
      </form>
    </section>
  )
}
