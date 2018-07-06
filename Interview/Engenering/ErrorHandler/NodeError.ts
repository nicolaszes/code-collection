/**
 * node 监听全局错误
 */
let process, logger
process.on('uncaughtException', (error: any) => {
  logger.error('uncaughtException', error)
})

process.on('unhandledRejection', (error: any) => {
  logger.error('unhandledRejection', error)
})