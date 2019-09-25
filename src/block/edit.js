/**
 * External dependencies
 */
import classnames from 'classnames/dedupe';

/**
 * WordPress dependencies
 */
import {
    applyFilters,
    Component,
    Fragment,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    InnerBlocks,
    BlockControls,
    RichText,
	PanelColorSettings,
    FontSizePicker,
    withFontSizes,
} from '@wordpress/block-editor';
import {
    BaseControl,
    PanelBody,
    TextControl,
    RangeControl,
    ToggleControl,
    TabPanel,
    Toolbar,
    ColorIndicator,
} from '@wordpress/components';
import { compose } from '@wordpress/compose';

/**
 * Block Edit Class.
 */
class BlockEdit extends Component {
    render() {
        const {
            attributes,
            setAttributes,
            isSelected,
            fallbackFontSize,
            fontSize,
			setFontSize,
        } = this.props;

        let { className = '' } = this.props;

        const {
            number,
            numberPosition,
            showContent,
            numberColor,
        } = attributes;

        className = classnames( 'ghostkit-counter-box', className );

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody>
                        <FontSizePicker
                            fallbackFontSize={ fallbackFontSize }
                            value={ fontSize.size }
                            onChange={ setFontSize }
                        />
                        <BaseControl
                            label={ __( 'Number Position' ) }
                        >
                            <Toolbar controls={ [
                                {
                                    icon: 'align-center',
                                    title: __( 'Top' ),
                                    onClick: () => setAttributes( { numberPosition: 'top' } ),
                                    isActive: numberPosition === 'top',
                                },
                                {
                                    icon: 'align-left',
                                    title: __( 'Left' ),
                                    onClick: () => setAttributes( { numberPosition: 'left' } ),
                                    isActive: numberPosition === 'left',
                                },
                                {
                                    icon: 'align-right',
                                    title: __( 'Right' ),
                                    onClick: () => setAttributes( { numberPosition: 'right' } ),
                                    isActive: numberPosition === 'right',
                                },
                            ] } />
                        </BaseControl>
                    </PanelBody>
                    <PanelBody>
                        <ToggleControl
                            label={ __( 'Show Content' ) }
                            checked={ !! showContent }
                            onChange={ ( val ) => setAttributes( { showContent: val } ) }
                        />
                    </PanelBody>
                    <PanelColorSettings
    					initialOpen={ false }
    					title={ __( 'Colors' ) }
    					colorSettings={[
    						{
    							label: __( 'Number Color' ),
    							value: numberColor,
    							onChange: ( nextColor, ...whatelse ) => {
    								setAttributes(
    									{
    										numberColor: nextColor
    									}
    								)
    							}
    						}
    					]}
    				/>
                </InspectorControls>
                <BlockControls>
                    <Toolbar controls={ [
                        {
                            icon: 'align-center',
                            title: __( 'Number Position Top' ),
                            onClick: () => setAttributes( { numberPosition: 'top' } ),
                            isActive: numberPosition === 'top',
                        },
                        {
                            icon: 'align-left',
                            title: __( 'Number Position Left' ),
                            onClick: () => setAttributes( { numberPosition: 'left' } ),
                            isActive: numberPosition === 'left',
                        },
                        {
                            icon: 'align-right',
                            title: __( 'Number Position Right' ),
                            onClick: () => setAttributes( { numberPosition: 'right' } ),
                            isActive: numberPosition === 'right',
                        },
                    ] } />
                </BlockControls>
                <div className={ className }>
                    <div className={ `ghostkit-counter-box-number ghostkit-counter-box-number-align-${ numberPosition ? numberPosition : 'left' }` }>
                        <RichText
                            tagName="div"
                            className="ghostkit-counter-box-number-wrap"
                            style={ {
            					fontSize: fontSize.size ? fontSize.size + 'px' : undefined,
            					color: numberColor,
            				} }
                            placeholder={ __( 'Add number…' ) }
                            value={ number }
                            onChange={ ( value ) => setAttributes( { number: value } ) }
                            formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
                            isSelected={ isSelected }
                            keepPlaceholderOnFocus
                        />
                    </div>
                    { showContent ? (
                        <div className="ghostkit-counter-box-content">
                            <InnerBlocks
                                template={ [ [ 'core/paragraph', { content: __( 'Wow, this is an important counts, that you should know!' ) } ] ] }
                                templateLock={ false }
                            />
                        </div>
                    ) : '' }
                </div>
            </Fragment>
        );
    }
}

const Edit = compose( [
	withFontSizes( 'fontSize' ),
] )( BlockEdit );

export default Edit;
