import { useEffect } from 'react'
import { getConfig } from './config/editorConfig'
import { EditorProvider } from './editor/EditorProvider'
import EditorShell from './components/shell/EditorShell'
import { preloadAllFonts } from './utils/fontLoader'
import './styles/tokens.css'
import './styles/nxicons.css'
import './styles/shell.css'

/**
 * App — boots the new pixel-perfect editor shell on the engine.
 *
 * Phase 0: loads a demo "Arched" document so the shell is visible in dev.
 * Real Shopify document loading (useDesignLoader → shape/size from metaobject)
 * wires back in here once the engine UI is locked in.
 */

// Demo document — mirrors the reference (sailboard arch, 100×200 cm).
const DEMO_DOC = {
  id: 'demo-arch',
  name: 'Arched',
  shape: { type: 'arch', svgPath: null },
  sizeCm: { w: 100.02, h: 200 },
  dpi: 150,
  background: { type: 'none', value: null },
}

export default function App() {
  const { productTitle } = getConfig()

  useEffect(() => {
    preloadAllFonts()
  }, [])

  return (
    <EditorProvider initialDoc={DEMO_DOC}>
      <EditorShell productTitle={productTitle || 'Create Your ...'} price="£109.99" />
    </EditorProvider>
  )
}
