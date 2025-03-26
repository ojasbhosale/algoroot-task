// Mock data service
export const fetchData = () => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        // Generate mock data
        const mockData = Array.from({ length: 50 }, (_, index) => ({
          id: index + 1,
          name: `Item ${index + 1}`,
          category: ["Electronics", "Clothing", "Food", "Books", "Sports"][Math.floor(Math.random() * 5)],
          price: Math.floor(Math.random() * 1000) + 10,
          stock: Math.floor(Math.random() * 100),
          rating: (Math.random() * 5).toFixed(1),
          date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split("T")[0],
        }))
  
        resolve(mockData)
      }, 800)
    })
  }
  
  