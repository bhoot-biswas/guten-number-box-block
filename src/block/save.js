/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';
import { Component } from '@wordpress/element';
import {
    InnerBlocks,
    RichText,
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
            animateInViewport,
            numberPosition,
            showContent,
        } = this.props.attributes;

        let {
            animateInViewportFrom,
        } = this.props.attributes;

        animateInViewportFrom = parseFloat( animateInViewportFrom );

        let className = 'ghostkit-counter-box';

        className = applyFilters( 'ghostkit.blocks.className', className, {
            ...{
                name,
            },
            ...this.props,
        } );

        return (
            <div className={ className }>
                <div
                    className={ `ghostkit-counter-box-number ghostkit-counter-box-number-align-${ numberPosition ? numberPosition : 'left' }` }
                >
                    <RichText.Content
                        tagName="div"
                        className={ `ghostkit-counter-box-number-wrap${ animateInViewport ? ' ghostkit-count-up' : '' }` }
                        value={ number }
                        { ...{
                            'data-count-from': animateInViewport && animateInViewportFrom ? animateInViewportFrom : null,
                        } }
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
