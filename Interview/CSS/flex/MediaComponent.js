/**
 * Created by zhiyang on 2017/11/14.
 */
import React from 'react'
import config from '../../../config/'

class MediaComponent extends React.Component {
  render () {
    const {block, contentState} = this.props
    const entity = contentState.getEntity(block.getEntityAt(0))
    const {url} = entity.getData()
    const type = entity.getType()
    let media = null
    // 考虑到以后还可能有视频
    if (type === 'img') {
      media = <img src={`${config.file1}/${url}`} className="RichEditor-pic" alt="用户上传的图片"/>
    }
    return media
  }
}

export default MediaComponent
