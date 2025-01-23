export default function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Was machst du?!' })
      return
    }
  
    const { password } = req.body
  
    if (!password) {
      res.status(400).json({ error: 'Password wird benötigt' })
      return
    }
  
    const passwordLena = process.env.PASSWORD_LENA
    const keyLena = process.env.KEY_LENA
    const passwordRene = process.env.PASSWORD_RENE
    const keyRene = process.env.KEY_RENE
    const passwordChris = process.env.PASSWORD_CHRIS
    const keyChris = process.env.KEY_CHRIS
  
    if (password === passwordLena) {
      res.status(200).json({ key: keyLena, name: 'Lena' })
    } else if (password === passwordRene) {
        res.status(200).json({ key: keyRene, name: 'René' })
    } else if (password === passwordChris) {
      res.status(200).json({ key: keyChris, name: 'Chris' })
    } else {
      res.status(401).json({ error: 'Nicht authorisiert' })
    }
  }