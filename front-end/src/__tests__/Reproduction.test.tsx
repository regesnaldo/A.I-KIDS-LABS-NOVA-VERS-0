
import { render, screen } from '@testing-library/react';
import SeasonMissions from '../components/SeasonMissions';
import { describe, it, expect } from 'vitest';

describe('SeasonMissions', () => {
    it('crashes if missions is an object', () => {
        const badMissions: any = { some: 'data' };
        try {
            render(<SeasonMissions missions={badMissions} loading={false} />);
        } catch (e: any) {
            console.log('Caught error:', e.message);
            console.log('Stack:', e.stack);
        }
    });

    it('crashes if missions is undefined', () => {
        const badMissions: any = undefined;
        try {
            render(<SeasonMissions missions={badMissions} loading={false} />);
        } catch (e: any) {
            console.log('Caught error for undefined:', e.message);
        }
    });
});
