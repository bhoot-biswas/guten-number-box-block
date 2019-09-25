/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';
import { Component } from '@wordpress/element';
import {
    InnerBlocks,
    RichText,
    getFontSizeClass,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import metadata from './block.json';

const { name } = metadata;

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
        } = this.props.attributes;

        const fontSizeClass = getFontSizeClass( fontSize );
        const className = classnames( {
    		'ghostkit-counter-box': true,
    		[ fontSizeClass ]: fontSizeClass,
    	} );

    	const styles = {
    		fontSize: fontSizeClass ? undefined : customFontSize,
    	};

        return (
            <div className={ className }>
                <div
                    className={ `ghostkit-counter-box-number ghostkit-counter-box-number-align-${ numberPosition ? numberPosition : 'left' }` }
                >
                    <RichText.Content
                        tagName="div"
                        className="ghostkit-counter-box-number-wrap"
                        style={ styles }
                        value={ number }
                    />
                </div>
                { showContent ? (
                    <div className="ghostkit-counter-box-content">
                        <InnerBlocks.Content />
                    </div>
                ) : '' }
            </div>
        );
    }
}

export default BlockSave;
