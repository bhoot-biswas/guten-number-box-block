/**
 * External dependencies
 */
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * WordPress dependencies
 */
import {
    InnerBlocks,
    RichText,
    getFontSizeClass,
} from '@wordpress/block-editor';
import { Component } from '@wordpress/element';

/**
 * Functions
 */
export const getIconArray = value => {
	if ( typeof value !== 'string' ) {
		return null
	}
	if ( ! value.match( /\w*-/ ) ) {
		return null
	}
	return [
		value.match( /\w*/ ), // Prefix.
		// value.match( /\w*/ )[ 0 ], // Prefix.
		value.match( /\w+-(.*)$/ )[ 1 ], // Icon name.
	]
}

/**
 * Block Save Class.
 */
class BlockSave extends Component {
    render() {
        const {
            number,
            numberPosition,
            showContent,
            numberColor,
            fontSize,
		    customFontSize,
            showBadge,
            badgeIcon,
        } = this.props.attributes;

        const fontSizeClass = getFontSizeClass( fontSize );
        const selectedIcon = getIconArray( badgeIcon );
        const className = classnames( {
    		'bengal-studio-number-card': true,
    		[ fontSizeClass ]: fontSizeClass,
    	} );

    	const styles = {
    		fontSize: fontSizeClass ? undefined : customFontSize,
            color: numberColor,
    	};

        return (
            <div className={ className }>
                <div
                    className={ `bengal-studio-number-card__number bengal-studio-number-card__number--align-${ numberPosition ? numberPosition : 'left' }` }
                >
                    <RichText.Content
                        tagName="div"
                        className="bengal-studio-number-card__number-container"
                        style={ styles }
                        value={ number }
                    />
                    { showBadge && (
                        <div className="bengal-studio-number-card__badge">
                            <FontAwesomeIcon icon={ selectedIcon } />
                        </div>
                    ) }
                </div>
                { showContent ? (
                    <div className="bengal-studio-number-card__content">
                        <InnerBlocks.Content />
                    </div>
                ) : '' }
            </div>
        );
    }
}

export default BlockSave;
