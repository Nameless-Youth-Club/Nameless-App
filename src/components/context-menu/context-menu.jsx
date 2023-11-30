import React from 'react'
import styles from './context-menu.module.scss'


function ContextMenu({items}) {

    return (
        <div className={styles.contextMenuContainer}>
            {
                items?.map(item => ((
                    <a href={item.link} onClick={item.onClick}>{item.text}</a>
                )))
            }
        </div>
    )
}

export default ContextMenu