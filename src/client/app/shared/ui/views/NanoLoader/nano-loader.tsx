import clsx from 'clsx'

import styles from './nano-loader.module.css'

export type TNanoLoaderProps = {
  className?: string
  testId?: string
  isLoading: boolean
  children: React.ReactNode
  theme?: 'default' | 'transparent'
}

export const NanoLoader = ({ className, isLoading, children, testId, theme }: TNanoLoaderProps) => (
  <div
    className={clsx(styles.root, { [styles['root-loading'] as string]: isLoading }, className)}
    data-testid={testId}
    data-test-is-loading={isLoading}
  >
    {children}
    <div
      className={clsx(styles.overlay, {
        [styles['overlay--transparent'] as string]: theme === 'transparent',
        [styles['overlay--loading'] as string]: isLoading,
      })}
    >
      <div className={styles.spinner} />
    </div>
  </div>
)

NanoLoader.defaultProps = {
  className: '',
  isLoading: false,
  theme: 'default',
}
