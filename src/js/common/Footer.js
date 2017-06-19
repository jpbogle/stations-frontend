import React from 'react';

const Footer = () => {
    const styles = {
        root: {
            position: 'absolute',
            bottom: '0px',
            left: '0px',
            width: '100vw',
            height: '35px',
            borderTop: '1px solid #EDEDED',
            display: 'flex',
            padding: '1em',
            alignItems: 'center',
            fontSize: '10px',
            color: '#C6C6C6',
            backgroundColor: 'white',
        },
        anchor: {
            paddingLeft: '5px',
        },
    };

    const href = 'http://repo.nibr.novartis.net/artifactory/nibr-web/wag/docs/release/0.3.0/index.html';

    return (<div style={styles.root}>
        <span>Generated on 6/5/2017, 4:20:45 PM with WAG version:</span>
        <a
          style={styles.anchor}
          href={href}
          target="_blank"
        ><code>0.3.0</code></a>
    </div>);
};

export default Footer;
